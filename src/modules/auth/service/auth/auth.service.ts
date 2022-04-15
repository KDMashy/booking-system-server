import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';

@Injectable()
export class AuthService {
    constructor(@Inject(UserService) private readonly userService: UserService) {}

    async validateUser(email:string, password: string) {
        const userDB = await this.userService.FindUser(email);
        if(userDB && userDB.password === password){
            return userDB;
        }
        return null;
    }
}
