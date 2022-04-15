import { IsNotEmpty, IsEmail, Length, isNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @Length(3, 30)
    firstname: string;

    @IsNotEmpty()
    @Length(3, 30)
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export interface IUser {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export class SerialisedUser {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;

    @Exclude()
    password: string;
}