import { Body, Controller, Delete, HttpCode, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
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
    createBooking(
        @Request() req,
        @Body() booking: CreateBookDto
    ) {
        return this.roomBookingService.createBooking(booking, req.user.id);
    }

    @UseGuards(AuthenticatedGuard)
    @Put('booking/delete')
    @HttpCode(202)
    deleteBooking(
        @Body() booking: BookRoom
    ) {
        return this.roomBookingService.deleteBooking(booking);
    }


    @Post('rooms/filter/:hotelid')
    @HttpCode(200)
    filterRoom(
        @Body() filter: RoomFilter,
        @Param('hotelid', ParseIntPipe) hotelid: number
    ) {
        return this.roomBookingService.filterRooms(filter, hotelid);
    }
}
