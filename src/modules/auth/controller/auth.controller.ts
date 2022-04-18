import { Controller, Get, HttpCode, Post, Req, Request, Session, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth/auth.service";
import { JwtAuthGuard } from "../utils/guards/jwt.guard";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/guards/local.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {}

    @UseGuards(AuthenticatedGuard)
    @Get('logout')
    @HttpCode(200)
    async GetAuthStatus(@Session() session){
        session.destroy();
    }
}