import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../service/auth/auth.service";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/local.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login() {}

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async GetAuthStatus(@Req() req: Request){
        return req.user;
    }
}