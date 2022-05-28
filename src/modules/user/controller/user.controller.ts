import { Body, Controller, Delete, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { RoomBookingsService } from 'src/modules/hotel/service/room-bookings/room-bookings.service';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly bookingService: RoomBookingsService
    ) {}

    @Post('register')
    @HttpCode(201)
    createUser(@Body() user: CreateUserDto){
        return this.userService.createUser(user);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    @HttpCode(200)
    getUserProfile(@Req() req) {
        return this.userService.getProfile(req.user);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('bookings')
    @HttpCode(202)
    getUserBookingHistory(@Req() req) {
        return this.bookingService.getAllBookingByUser(req.user.id);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('delete')
    @HttpCode(202)
    deleteUserById(@Req() req,) {
        return this.userService.deleteUser(req.user.id);
    }
}
