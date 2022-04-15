import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth/auth.service";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {
        super();
    }

    async validate(email: string, password: string) {
        const user = this.authService.validateUser(email, password);
        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}