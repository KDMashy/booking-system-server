import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../../dto/room.dto';
import { RoomFilter } from '../../dto/roomFilter';
import { Room } from '../../entity/room.entity';
import { HotelService } from '../hotel/hotel.service';
import { RoomBookingsService } from '../room-bookings/room-bookings.service';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomModel: Repository<Room>,
        private hotelService: HotelService,
    ) {}

    async CreateRoom(room: CreateRoomDto) {
        try {
            const findRoom = await this.roomModel.findOne({ roomnumber: room.roomnumber });
            if (findRoom) {
                throw new HttpException({
                    message: 'Room already exist',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }
            const findHotel = await this.hotelService.FindHotelById(room.hotelid); 
            if (!findHotel){
                throw new HttpException({
                    message: 'Hotel does not exist',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }
            const newRoom = await this.roomModel.create( room );
            newRoom.save();
            return HttpStatus.CREATED;
        } catch (err){
            return err;
        }
    }

    async GetAllRoomsByHotelId(hotelId: number){
        const findHotel = await this.hotelService.FindHotelById(hotelId);
        if (!findHotel){
            throw new HttpException({
                message: 'Hotel does not exist',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
        var rooms:Room[] = await this.roomModel.find({ where: { hotelid: findHotel.id } });
        return rooms;
    }

    async GetRoomById(id: number){
        const findRoom = await this.roomModel.findOne({ id: id });
        if (!findRoom) {
            throw new HttpException({
                message: 'Room does not exist',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
        return findRoom;
    }
}
