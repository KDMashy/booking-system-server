import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateRoomDto } from '../../dto/room.dto';
import { RoomFilter } from '../../dto/roomFilter';
import { RoomService } from '../../service/room/room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post('create')
    CreateRoom(@Body() room: CreateRoomDto) {
        return this.roomService.CreateRoom(room);
    }

    @Get(':id')
    GetAllRoomByHotel(@Param('id', ParseIntPipe) hotelid: number) {
        return this.roomService.GetAllRoomsByHotelId(hotelid);
    }

    @Get('rooms/:id')
    GetOneRoomByHotel(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.GetRoomById(id);
    }

    @Post('rooms/filter')
    FilterRooms(@Body() filter: RoomFilter) {
        return 'filterelt szobák';
    }

}
