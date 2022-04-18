import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncodePassword } from 'src/modules/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userModel: Repository<User>,
    ) {}

    async CreateUser(user: CreateUserDto) {
        try {
            if (
                user.username.length > 0 &&
                user.email.length > 0 &&
                user.password.length > 0
            ){
                const findUser = await this.userModel.findOne({ username: user.username});
                if (findUser){
                    throw new HttpException({
                        message: 'User already exists',
                        status: HttpStatus.CONFLICT,
                    }, HttpStatus.CONFLICT);
                }
                var emailRegex =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(!emailRegex.test(user.email)){
                    throw new HttpException({
                        message: 'User email is not correct',
                        status: HttpStatus.CONFLICT,
                    }, HttpStatus.CONFLICT);
                }
                var passwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                if(!passwRegex.test(user.password)){
                    throw new HttpException({
                        message: `User password is not correct, should contain: uppercase letter,  lowercase letter, special case letter, digits, and minimum length of 8`,
                        status: HttpStatus.CONFLICT,
                    }, HttpStatus.CONFLICT);
                }
                if(user.username.length < 5){
                    throw new HttpException({
                        message: 'Username is not correct',
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
            } else {
                throw new HttpException({
                    message: 'Missing fields from user registration',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }
        } catch (err) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    async DeleteUser(id: number){
        try{
            await this.userModel
                .createQueryBuilder()
                .delete()
                .from(User)
                .where("id = :id", { id: id })
                .execute();
            return HttpStatus.OK;
        } catch(err){
            return HttpStatus.CONFLICT;
        }
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
