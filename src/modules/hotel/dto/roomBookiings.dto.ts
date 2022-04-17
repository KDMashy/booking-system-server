import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto{
    @IsNotEmpty()
    roomid: number;
    
    userid?: number;

    hotelname?: string;

    @IsNotEmpty()
    fromdate: Date;

    @IsNotEmpty()
    expiration: Date;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    reserved: number;
}

export interface BookRoom {
    id?: number;
    roomid: number;
    userid?: number;
    hotelname?: string;
    fromdate: Date;
    expiration: Date;
    price: number;
    reserved: number;
}

export class SerialisedBook {
    id?: number;
    roomid: number;
    hotelname?: string;
    fromdate: Date;
    expiration: Date;
    price: number;
    reserved: number;

    @Exclude()
    userid: number;
}