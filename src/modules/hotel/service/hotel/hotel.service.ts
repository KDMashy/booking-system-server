import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from '../../dto/hotel.dto';
import { Hotel } from '../../entity/hotel.entity';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private hotelModel: Repository<Hotel>,
    ) {}

    async CreateHotel(hotel: CreateHotelDto) {
        if(
            hotel.name.length > 0 &&
            hotel.address.length > 0 &&
            hotel.description.length > 0
        ){
            const findHotel = await this.hotelModel.findOne({ name: hotel.name });
            if (findHotel) {
                throw new HttpException({
                    message: 'Hotel already exist',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }
            const newHotel = await this.hotelModel.create( hotel );
            newHotel.save();
            return HttpStatus.CREATED;
        } else {
            throw new HttpException({
                message: 'Hotel cant be created, invalid input',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
    }

    async DeleteHotelById(hotelid: number){
        try{
            await this.hotelModel.delete(hotelid);
            return HttpStatus.OK;
        } catch(err){
            return HttpStatus.CONFLICT;
        }
    }

    async GetAllHotel(){
        return await this.hotelModel.find();
    }

    async FindHotelById(id: number){
        const findHotel = await this.hotelModel.findOne({ id: id });
        if (!findHotel) {
            throw new HttpException({
                message: 'Hotel does not exist',
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
        return findHotel 
    }

    async FindHotelByName(name: string){
        try {
            return await this.hotelModel.findOne({ name: name });
        } catch (err){
            return HttpStatus.NOT_FOUND;
        }
    }
}
