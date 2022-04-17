import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('booked')
export class RoomBooking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    roomid: number;

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
}