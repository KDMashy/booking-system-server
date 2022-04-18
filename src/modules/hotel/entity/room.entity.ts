import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomBooking } from "./roomBookings.entity";
@Entity('rooms')
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    hotelid: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    roomnumber: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    roomtype: string;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    description: string;

    @Column({
        type: 'integer',
        nullable: false
    })
    price: number;

    @OneToMany(() => RoomBooking, (booking) => booking.roomid)
    bookings: RoomBooking[];
}