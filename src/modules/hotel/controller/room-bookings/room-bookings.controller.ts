import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { BookRoom, CreateBookDto } from '../../dto/roomBookiings.dto';
import { RoomFilter } from '../../dto/roomFilter';
import { RoomBookingsService } from '../../service/room-bookings/room-bookings.service';

@Controller('')
export class RoomBookingsController {
    constructor(private readonly roomBookingService: RoomBookingsService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('booking/book')
    @HttpCode(201)
    CreateBooking(
        @Request() req,
        @Body() booking: CreateBookDto
    ) {
        return this.roomBookingService.CreateBooking(booking, req.user.id);
    }

    @UseGuards(AuthenticatedGuard)
    @Post('booking/delete')
    @HttpCode(202)
    DeleteBooking(
        @Body() booking: BookRoom
    ) {
        return this.roomBookingService.DeleteBooking(booking);
    }


    @Post('rooms/filter/:hotelid')
    @HttpCode(200)
    FilterRooms(
        @Body() filter: RoomFilter,
        @Param('hotelid', ParseIntPipe) hotelid: number
    ) {
        return this.roomBookingService.FilterRooms(filter, hotelid);
    }
}
