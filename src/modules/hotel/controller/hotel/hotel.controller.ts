import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateHotelDto } from '../../dto/hotel.dto';
import { HotelService } from '../../service/hotel/hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService){}

    @Post('create')
    CreateHotel(@Body() hotel: CreateHotelDto) {
        return this.hotelService.CreateHotel(hotel);
    }

    @Get('hotels')
    GetAllHotel(){
        return this.hotelService.GetAllHotel();
    }

    @Get(':id')
    GetOneHotel(@Param('id', ParseIntPipe) id: number) {
        return this.hotelService.FindHotelById(id);
    }

}
