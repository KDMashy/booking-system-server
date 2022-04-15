import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../entity/room.entity';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomModel: Repository<Room>,
    ) {}
}
