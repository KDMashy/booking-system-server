import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "./hotel.entity";
import { Room } from "./room.entity";
@Entity('booked')
export class RoomBooking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    userid: number;

    @Column({
        type: 'date',
        nullable: false
    })
    fromdate: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    expiration: Date;

    @Column({
        type: 'integer',
        nullable: false
    })
    price: number

    @Column({
        type: 'integer',
        default: 1,
    })
    reserved: number;

    @ManyToOne(() => Room, (room) => room.bookings)
    roomid: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
    hotelid: number;
}