import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sports{
    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    name:string ;

    @Column()
    current_time:Date;

}