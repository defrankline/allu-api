import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    name: 'name',
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
    default: '',
    name: 'email',
  })
  email: string;

  @Column({
    nullable: false,
    unique: true,
    default: '',
    name: 'number',
  })
  number: string;

  @Column({
    nullable: false,
    default: '',
    name: 'password',
  })
  password: string;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn()
  company: Company;
}
