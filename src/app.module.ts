import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './modules/config/db.config';
import { HotelModule } from './modules/hotel/module/hotel/hotel.module';
import { RoomModule } from './modules/hotel/module/room/room.module';

@Module({
  imports: [
    HotelModule,
    RoomModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
