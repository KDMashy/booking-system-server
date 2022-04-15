import { IsNotEmpty } from 'class-validator';

export class CreateHotelDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone: string;
}

export interface IHotel {
    id?: number;
    name: string;
    address: string;
    phone: string;
}