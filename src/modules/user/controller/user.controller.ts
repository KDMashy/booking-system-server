import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Session, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { RoomBookingsService } from 'src/modules/hotel/service/room-bookings/room-bookings.service';
import { CreateUserDto, SerialisedUser } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly bookingService: RoomBookingsService
    ) {}

    @Post('register')
    CreateUser(@Body() user: CreateUserDto){
        return this.userService.CreateUser(user);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    GetUserProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('bookings')
    GetUserBookingHistory(@Req() req) {
        return this.bookingService.GetAllBookingByUser(req.user.id);
    }
}
