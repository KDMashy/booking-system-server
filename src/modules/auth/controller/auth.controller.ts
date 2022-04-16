import { Controller, Get, Post, Req, Request, Session, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth/auth.service";
import { JwtAuthGuard } from "../utils/guards/jwt.guard";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/guards/local.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        //return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    GetUserProfile(@Request() req){
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async GetAuthStatus(@Session() session){
        console.log(session);
        //session.destroy();
    }
}