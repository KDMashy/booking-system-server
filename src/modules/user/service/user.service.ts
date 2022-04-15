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
            const findUser = await this.userModel.findOne({ username: user.username});
            if (findUser){
                throw new HttpException({
                    message: 'Cannot create user',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }
            const passw = EncodePassword(user.password);
            const newUser = await this.userModel.create({
                username: user.username,
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

    async FindUserByName(username: string): Promise<User>{
        return this.userModel.findOne({ username });
    }

    async FindUserById(id: number) {
        return this.userModel.findOne(id);
    }
}
