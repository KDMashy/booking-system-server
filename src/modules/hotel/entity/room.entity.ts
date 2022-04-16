import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
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
}