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
    CreateRoom(@Body() room: CreateRoomDto) {
        return this.roomService.CreateRoom(room);
    }

    @Get('room/:id')
    @HttpCode(202)
    GetAllRoomByHotel(@Param('id', ParseIntPipe) hotelid: number) {
        return this.roomService.GetAllRoomsByHotelId(hotelid);
    }

    @Get('rooms/:id')
    @HttpCode(202)
    GetOneRoomByHotel(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.GetRoomById(id);
    }
}
