import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './modules/config/db.config';
import { HotelModule } from './modules/hotel/module/hotel/hotel.module';
import { RoomBookingsModule } from './modules/hotel/module/room-bookings/room-bookings.module';
import { RoomModule } from './modules/hotel/module/room/room.module';

@Module({
  imports: [
    HotelModule,
    RoomModule,
    RoomBookingsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
