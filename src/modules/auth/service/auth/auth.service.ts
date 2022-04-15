import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { ComparePassword } from 'src/modules/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username:string, password: string) {
        const userDB = await this.userService.FindUser(username);
        console.log('userDB');
        if(userDB){
            const matched = ComparePassword(password, userDB.password);
            console.log('inside' + userDB);
            if (matched){
                console.log('after' + userDB);
                return userDB;
            }
            return null;
        }
        return null;
    }
}
