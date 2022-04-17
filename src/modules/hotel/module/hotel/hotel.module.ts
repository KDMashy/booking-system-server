import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from '../../controller/hotel/hotel.controller';
import { Hotel } from '../../entity/hotel.entity';
import { HotelService } from '../../service/hotel/hotel.service';

@Module({
    imports: [TypeOrmModule.forFeature([Hotel])],
    controllers: [HotelController],
    providers: [HotelService],
    exports: [HotelService]
})
export class HotelModule {}
