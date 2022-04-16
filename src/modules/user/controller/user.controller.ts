import { Body, Controller, Get, Param, ParseIntPipe, Post, Session, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateUserDto, SerialisedUser } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /*@UseGuards(AuthenticatedGuard)
    @Get(':username')
    GetUser(@Param('username') username: string){
        const user = this.userService.FindUserByName(username);
        return plainToClass(SerialisedUser, user);
    }*/

    @Post('register')
    CreateUser(@Body() user: CreateUserDto){
        return this.userService.CreateUser(user);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    GetUserProfile(@Session() session) {
        return session.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('bookings')
    GetUserBookingHistory(@Session() session) {
        return 'foglalások';
    }
}
