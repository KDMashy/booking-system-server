import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateHotelDto } from '../../dto/hotel.dto';
import { HotelService } from '../../service/hotel/hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService){}

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    @HttpCode(201)
    createHotel(@Body() hotel: CreateHotelDto) {
        return this.hotelService.createHotel(hotel);
    }

    @Get('hotels')
    @HttpCode(202)
    getAllHotel(){
        return this.hotelService.getAllHotel();
    }

    @Get(':id')
    @HttpCode(202)
    getOneHotel(@Param('id', ParseIntPipe) id: number) {
        return this.hotelService.findHotelById(id);
    }

}
