import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
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
    CreateUser(@Body() user: CreateUserDto){
        return this.userService.CreateUser(user);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    @HttpCode(200)
    GetUserProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('bookings')
    @HttpCode(202)
    GetUserBookingHistory(@Req() req) {
        return this.bookingService.GetAllBookingByUser(req.user.id);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('delete/:id')
    @HttpCode(202)
    DeleteUserById(
        @Req() req,
        @Param('id', ParseIntPipe) id: number
    ) {
        if(req.user.id == id){
            return this.userService.DeleteUser(id);
        } else {
            return HttpStatus.CONFLICT;
        }
    }
}
