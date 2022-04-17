import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRoom, CreateBookDto } from '../../dto/roomBookiings.dto';
import { RoomFilter } from '../../dto/roomFilter';
import { Room } from '../../entity/room.entity';
import { RoomBooking } from '../../entity/roomBookings.entity';
import { HotelService } from '../hotel/hotel.service';
import { RoomService } from '../room/room.service';

@Injectable()
export class RoomBookingsService {
    constructor(
        @InjectRepository(RoomBooking)
        private bookModel: Repository<RoomBooking>,
        private roomService: RoomService,
        private hotelService: HotelService
    ) {}

    async CreateBooking(book: CreateBookDto, userid: number){
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
        const findHotel = await this.hotelService.FindHotelById(findRoom.hotelid);
        book.hotelname = findHotel.name;
        book.fromdate = fromD;
        book.expiration = toD;
        var dayDiff = toD.getTime() - fromD.getTime();
        var days = Math.ceil(dayDiff / (1000 * 3600 * 24));
        book.price *= days;
        book.userid = userid;
        const booking = await this.bookModel.create(book);
        booking.save();
        return booking;
    }

    async DeleteBooking(booking: BookRoom){
        await this.bookModel.delete(booking.id);
        return HttpStatus.OK;
    }

    async GetActiveBookingByUser(userid: number){
        return await this.bookModel.find({ where: { userid: userid, reserved: 1 }})
    }

    async GetAllBookingByUser(userid: number){
        var history: RoomBooking[] = await this.bookModel.find({
            where: {userid: userid},
            relations: ['roomid'],
        });
        
        return history;
    }

    async CheckIntervalAvailable(roomid: number, fromdate: Date, expires: Date){
        var bookings: BookRoom[] = await this.bookModel.find({ 
            where: {roomid: roomid},
        });
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
        }
        return 0;
        
    }

    async FilterRooms(filter: RoomFilter, hotelid: number){
        const rooms: Room[] = await this.roomService.GetAllRoomsByHotelId(hotelid);
        var popped: boolean = false;
        for (let i = 0; i < rooms.length; i++) {
            if(filter.maxprice && filter.maxprice < rooms[i].price){
                rooms.splice(i - 1, 1);
                popped = true;
            }
            if(filter.fromdate && filter.untildate &&
                !isNaN(new Date(filter.fromdate).getTime()) && !isNaN(new Date(filter.untildate).getTime()) &&
                popped == false
            ){
                const reservedRoom = await this.CheckIntervalAvailable(
                    rooms[i].id,
                    new Date(filter.fromdate),
                    new Date(filter.untildate) 
                );
                if(reservedRoom == 1){
                    rooms.splice(i - 1, 1);
                    popped = true;
                }
            }
            if(
                filter.available == true && popped == false &&
                !isNaN(new Date(filter.fromdate).getTime()) && !isNaN(new Date(filter.untildate).getTime())
            ){
                var tomorrowDate = new Date();
                tomorrowDate.setDate(tomorrowDate.getDate() + 1);
                const reservedRoom = await this.CheckIntervalAvailable(
                    rooms[i].id,
                    new Date(),
                    tomorrowDate
                );
                if(reservedRoom == 1){
                    rooms.splice(i - 1, 1);
                    popped = true;
                }
            }
        }
        if (filter.sortbyprice === 'igen'){
            for (let j = 0; j < rooms.length - 1; j++){
                for (let i = j + 1; i < rooms.length; i++){
                    if (rooms[j].price > rooms[i].price){
                        var x = rooms[j];
                        rooms[j] = rooms[i];
                        rooms[i] = x;
                    }
                }
            }
        } else if (filter.sortbyprice === 'nem') {
            for (let j = 0; j < rooms.length - 1; j++){
                for (let i = j + 1; i < rooms.length; i++){
                    if (rooms[j].price < rooms[i].price){
                        var x = rooms[j];
                        rooms[j] = rooms[i];
                        rooms[i] = x;
                    }
                }
            }
        }
        return rooms;
    }
}