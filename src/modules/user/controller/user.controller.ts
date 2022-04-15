import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto, SerialisedUser } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':username')
    GetUser(@Param('username') username: string){
        const user = this.userService.FindUser(username);
        return plainToClass(SerialisedUser, user);
    }

    @Post('create')
    CreateUser(@Body() user: CreateUserDto){
        return this.userService.CreateUser(user);
    }
}
