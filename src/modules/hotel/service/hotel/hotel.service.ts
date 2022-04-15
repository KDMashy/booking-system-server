import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../../entity/hotel.entity';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private hotelModel: Repository<Hotel>,
    ) {}
}
