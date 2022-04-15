import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncodePassword } from 'src/modules/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, IUser } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userModel: Repository<User>,
    ) {}

    async CreateUser(user: CreateUserDto) {
        try {
            const findUser = await this.userModel.findOne({ email: user.email});
            if (findUser){
                throw new HttpException({
                    message: 'Cannot create user',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }
            const passw = EncodePassword(user.password);
            const newUser = await this.userModel.create({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: passw,
            });
            newUser.save();
            return HttpStatus.CREATED;
        } catch (err) {
            return err;
        }
        return null;
    }

    async DeleteUser(id: number){

    }

    async GetUsers() {
        return this.userModel.find();
    }

    async FindUser(email: string): Promise<User>{
        return this.userModel.findOne({ email });
    }
}
