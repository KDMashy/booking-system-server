import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../../dto/room.dto';
import { Room } from '../../entity/room.entity';
import { HotelService } from '../hotel/hotel.service';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomModel: Repository<Room>,
        private hotelService: HotelService,
    ) {}

    async createRoom(room: CreateRoomDto) {
        if(
            room.description.length > 0 &&
            room.price > 0 &&
            room.roomnumber.length > 0 &&
            room.roomtype.length > 0
        ){
            //Létezik-e már ilyen szoba
            const findRoom = await this.roomModel.findOne({ roomnumber: room.roomnumber });
            if (findRoom) {
                throw new HttpException({
                    message: 'Room already exist',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }

            //Létezik-e a hotel
            const findHotel = await this.hotelService.findHotelById(room.hotelid); 
            if (!findHotel){
                throw new HttpException({
                    message: 'Hotel does not exist',
                    status: HttpStatus.BAD_REQUEST,
                }, HttpStatus.BAD_REQUEST);
            }

            //Mentés
            const newRoom = await this.roomModel.create( room );
            newRoom.save();
            return HttpStatus.CREATED;
        } else {
            throw new HttpException({
                message: 'Room cant be created, invalid data given',
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllRoomsByHotelId(hotelId: number){
        const findHotel = await this.hotelService.findHotelById(hotelId);
        if (!findHotel){
            throw new HttpException({
                message: 'Hotel does not exist',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
        var rooms:Room[] = await this.roomModel.find({ where: { hotelid: findHotel.id } });
        return rooms;
    }

    async getRoomById(id: number){
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
