import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateHotelDto } from '../../dto/hotel.dto';
import { HotelService } from '../../service/hotel/hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService){}

    @Post('create')
    @HttpCode(201)
    CreateHotel(@Body() hotel: CreateHotelDto) {
        return this.hotelService.CreateHotel(hotel);
    }

    @Get('hotels')
    @HttpCode(202)
    GetAllHotel(){
        return this.hotelService.GetAllHotel();
    }

    @Get(':id')
    @HttpCode(202)
    GetOneHotel(@Param('id', ParseIntPipe) id: number) {
        return this.hotelService.FindHotelById(id);
    }

}
