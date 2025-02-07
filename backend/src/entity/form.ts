import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class form{

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    full_name:string;

    @Column()
    user_name:string;

    @Column()
    email:string;

    @Column()
    phone:string;

    @Column()
    password:string;

    @Column()
    confirm_password:string;

    @Column()
    grade:string;

    @Column()
    gender:string;

    @Column('simple-array')
    sports:string[];
}