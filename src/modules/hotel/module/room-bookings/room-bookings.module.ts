import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomBookingsController } from '../../controller/room-bookings/room-bookings.controller';
import { RoomBooking } from '../../entity/roomBookings.entity';
import { RoomBookingsService } from '../../service/room-bookings/room-bookings.service';
import { RoomModule } from '../room/room.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoomBooking]),
        RoomModule,
    ],
    controllers: [RoomBookingsController],
    providers: [RoomBookingsService],
    exports: [RoomBookingsService],
})
export class RoomBookingsModule {}
