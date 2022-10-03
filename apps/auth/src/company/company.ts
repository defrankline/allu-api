import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyCategory } from './company-category';

@Entity()
export class Company {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'company_id',
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
    name: 'number',
  })
  number: string;

  @ManyToOne(() => CompanyCategory, { eager: true })
  @JoinColumn()
  category: CompanyCategory;
}
