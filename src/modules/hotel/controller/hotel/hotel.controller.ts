import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HotelService } from '../../service/hotel/hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService){}

    @Get('hotels')
    GetAllHotel(){
        return 'hotelek';
    }

    @Get(':id')
    GetOneHotel(@Param('id', ParseIntPipe) id: number) {
        return 'hotel';
    }

}
