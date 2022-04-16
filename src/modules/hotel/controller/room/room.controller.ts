import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RoomFilter } from '../../dto/roomFilter';
import { RoomService } from '../../service/room/room.service';

@Controller('hotel')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get(':hotelname')
    GetAllRoomByHotel(@Param('hotelname') hotel: string) {
        return 'hotel szobák';
    }

    @Get('room/:id')
    GetOneRoomByHotel(@Param('id', ParseIntPipe) id: number) {
        return 'hotel szoba';
    }

    @Post('rooms/filter')
    FilterRooms(@Body() filter: RoomFilter) {
        return 'filterelt szobák';
    }

}
