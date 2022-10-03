import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountGroup } from './account-group';

@Entity()
@Index(['number', 'company'], { unique: true })
export class Account {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'account_id',
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

  @ManyToOne(() => AccountGroup, { eager: true })
  @JoinColumn()
  accountGroup: AccountGroup;

  @Column({
    nullable: false,
    default: 0,
    type: 'bigint',
    name: 'company',
  })
  company: number;
}
