import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user {

    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    phno:string
}