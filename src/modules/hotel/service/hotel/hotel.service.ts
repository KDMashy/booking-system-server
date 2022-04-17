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
        try {
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
        } catch (err){
            return err;
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
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
        return findHotel 
    }

    async FindHotelByName(name: string){
        return await this.hotelModel.findOne({ name: name });
    }
}
