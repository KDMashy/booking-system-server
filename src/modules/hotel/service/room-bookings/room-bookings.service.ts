import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRoom, CreateBookDto } from '../../dto/roomBookiings.dto';
import { RoomBooking } from '../../entity/roomBookings.entity';
import { RoomService } from '../room/room.service';

@Injectable()
export class RoomBookingsService {
    constructor(
        @InjectRepository(RoomBooking)
        private bookModel: Repository<RoomBooking>,
        private roomService: RoomService,
    ) {}

    async CreateBooking(book: CreateBookDto){
        const findRoom = await this.roomService.GetRoomById(book.roomid);
        if (!findRoom) {
            throw new HttpException({
                message: 'Room does not exist',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
        const current = new Date();
        const fromD = new Date(book.fromdate);
        const toD = new Date(book.expiration);
        const checkIfAvailable = await this.CheckIntervalAvailable(findRoom.id, fromD, toD);
        if (
            current > fromD ||
            current.getTime() === fromD.getTime() ||
            current > toD ||
            current.getTime() === toD.getTime() ||
            toD.getTime() < fromD.getTime() ||
            fromD.getTime() === toD.getTime() ||
            checkIfAvailable == 0
        ) {
            throw new HttpException({
                message: 'Cant book for this interval',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
        if (isNaN(fromD.getTime()) || isNaN(toD.getTime())){
            throw new HttpException({
                message: 'Invalid date given',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
        book.fromdate = fromD;
        book.expiration = toD;
        var dayDiff = toD.getTime() - fromD.getTime();
        var days = Math.ceil(dayDiff / (1000 * 3600 * 24));
        book.price *= days;
        const booking = await this.bookModel.create(book);
        booking.save();
        return booking;
    }

    async DeleteBooking(booking: BookRoom){
        const deletUser = await this.bookModel.update(booking.id, booking);
        return HttpStatus.OK;
    }

    async GetActiveBookingByUser(userid: number){
        return await this.bookModel.find({ where: { userid: userid, reserved: 1 }})
    }

    async GetAllBookingByUser(userid: number){
        return await this.bookModel.find({ where: { userid: userid}});
    }

    async CheckIntervalAvailable(roomid: number, fromdate: Date, expires: Date){
        var bookings: BookRoom[] = await this.bookModel.find({ where: {roomid: roomid}});
        var foundReservation = 0;
        bookings.forEach(book => {
            var bookFromDate = new Date(book.fromdate);
            var bookToDate = new Date(book.expiration);
            if (
                (bookFromDate < fromdate &&
                    fromdate < bookToDate &&
                    book.reserved == 1) ||
                (bookFromDate < fromdate && 
                    fromdate < bookToDate && 
                    book.reserved == 1) ||
                (bookToDate > expires && 
                    expires > bookFromDate &&
                    book.reserved == 1) ||
                (bookFromDate > fromdate && 
                    bookToDate < expires && 
                    book.reserved == 1) ||
                bookFromDate.getTime() === fromdate.getTime() ||
                bookToDate.getTime() === expires.getTime()
            ) {
                foundReservation = 1;
            }
        });
        if (foundReservation == 0){
            return 1;
        } else {
            return 0;
        }
    }
}

export interface IDateChecker {
    fromdate: Date;
    expires: Date;
}
