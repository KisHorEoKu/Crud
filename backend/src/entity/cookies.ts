import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class cookies {
    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    name:string ;

    @Column()
    current_time:Date;
}