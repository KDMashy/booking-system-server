import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto{
    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    price: number;
}