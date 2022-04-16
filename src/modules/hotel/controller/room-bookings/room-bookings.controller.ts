import { Body, Controller, Param, Post, Session, UseGuards } from '@nestjs/common';
import { session } from 'passport';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { BookRoom, CreateBookDto } from '../../dto/roomBookiings.dto';
import { RoomBookingsService } from '../../service/room-bookings/room-bookings.service';

@Controller('room_booking')
export class RoomBookingsController {
    constructor(private readonly roomBookingService: RoomBookingsService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('book')
    CreateBooking(
        @Session() session,
        @Body() booking: CreateBookDto
    ) {
        return 'szobafoglalás';
    }

    @UseGuards(AuthenticatedGuard)
    @Post('delete')
    DeleteBooking(
        @Session() session,
        @Body() booking: BookRoom
    ) {
        return 'szobafogalás lemondása';
    }


}
