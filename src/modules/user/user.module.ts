import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomBookingsModule } from '../hotel/module/room-bookings/room-bookings.module';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoomBookingsModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
