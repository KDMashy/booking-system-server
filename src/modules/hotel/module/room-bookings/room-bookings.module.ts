import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomBookingsController } from '../../controller/room-bookings/room-bookings.controller';
import { RoomBooking } from '../../entity/roomBookings.entity';
import { RoomBookingsService } from '../../service/room-bookings/room-bookings.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoomBooking])],
    controllers: [RoomBookingsController],
    providers: [RoomBookingsService],
})
export class RoomBookingsModule {}
