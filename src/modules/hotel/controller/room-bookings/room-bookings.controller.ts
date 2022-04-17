import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { BookRoom, CreateBookDto } from '../../dto/roomBookiings.dto';
import { RoomBookingsService } from '../../service/room-bookings/room-bookings.service';

@Controller('room_booking')
export class RoomBookingsController {
    constructor(private readonly roomBookingService: RoomBookingsService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('book')
    CreateBooking(
        @Request() req,
        @Body() booking: CreateBookDto
    ) {
        return this.roomBookingService.CreateBooking(booking);
    }

    @UseGuards(AuthenticatedGuard)
    @Post('delete')
    DeleteBooking(
        @Body() booking: BookRoom
    ) {
        return this.roomBookingService.DeleteBooking(booking);
    }
}
