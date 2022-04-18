import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto{
    @IsNotEmpty()
    hotelid: number;
    
    @IsNotEmpty()
    roomnumber: string;

    @IsNotEmpty()
    roomtype: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;
}

export interface IRoom {
    id?: number;
    hotelid: number;
    roomnumber: string;
    roomtype: string;
    description: string;
    price: number;
}