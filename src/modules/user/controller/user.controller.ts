import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':email')
    GetUser(@Param('email') email: string){
        return this.userService.FindUser(email);
    }

    @Post('create')
    CreateUser(@Body() user: CreateUserDto){
        return this.userService.CreateUser(user);
    }
}
