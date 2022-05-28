import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateRoomDto } from '../../dto/room.dto';
import { RoomService } from '../../service/room/room.service';

@Controller('')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('room/create')
    @HttpCode(201)
    createRoom(@Body() room: CreateRoomDto) {
        return this.roomService.createRoom(room);
    }

    @Get('room/:id')
    @HttpCode(202)
    getAllRoomsByHotelId(@Param('id', ParseIntPipe) hotelid: number) {
        return this.roomService.getAllRoomsByHotelId(hotelid);
    }

    @Get('rooms/:id')
    @HttpCode(202)
    getOneRoomById(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.getRoomById(id);
    }
}
