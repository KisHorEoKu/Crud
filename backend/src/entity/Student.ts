
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  rn: number;

  @Column()
  year: number;

  @Column()
  mob: string;

  @Column()
  address: string;

  @Column('simple-array')
  sports: string[];

  @Column()
  scholarship: number;

  @Column({ nullable: true }) 
  comments: string;
}
