import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phnumber: String;  

    @Column()
    otp: number;   
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    expiryTime: Date;  

    @Column({ default: false })
    isVerified: boolean; 
}
