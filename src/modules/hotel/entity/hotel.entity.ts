import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomBooking } from "./roomBookings.entity";
@Entity('hotels')
export class Hotel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    address: string;
    
    @Column({
        type: 'varchar',
        length: 15,
        nullable: false
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    description: string;

    @OneToMany(() => RoomBooking, (booking) => booking.hotelid)
    bookings: RoomBooking[];
}