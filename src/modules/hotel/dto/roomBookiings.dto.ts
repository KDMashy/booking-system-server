import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto{
    @IsNotEmpty()
    roomid: number;
    
    @IsNotEmpty()
    userid: number;

    @IsNotEmpty()
    fromdate: Date;

    @IsNotEmpty()
    expiration: Date;

    @IsNotEmpty()
    reserved: number;
}

export interface BookRoom {
    id?: number;
    roomid: number;
    userid: number;
    fromdate: Date;
    expiration: Date;
    reserved: number;
}

export class SerialisedBook {
    id?: number;
    roomid: number;
    fromdate: Date;
    expiration: Date;
    reserved: number;

    @Exclude()
    userid: number;
}