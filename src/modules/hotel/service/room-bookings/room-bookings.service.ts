import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomBooking } from '../../entity/roomBookings.entity';

@Injectable()
export class RoomBookingsService {
    constructor(
        @InjectRepository(RoomBooking)
        private bookModel: Repository<RoomBooking>,
    ) {}
}
