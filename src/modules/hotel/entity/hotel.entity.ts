import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}