import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from '../../controller/room/room.controller';
import { Room } from '../../entity/room.entity';
import { RoomService } from '../../service/room/room.service';
import { HotelModule } from '../hotel/hotel.module';
import { RoomBookingsModule } from '../room-bookings/room-bookings.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
        HotelModule,
    ],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [RoomService],
})
export class RoomModule {}
