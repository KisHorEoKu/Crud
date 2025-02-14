import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;  

    @Column()
    token: String;   
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    expiryTime: Date;  

    @Column({ default: false })
    isVerified: boolean; 
}
