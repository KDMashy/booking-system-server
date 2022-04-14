import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto{
    @IsNotEmpty()
    hotelid: number;
    
    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    price: number;
}