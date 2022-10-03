import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountGroup } from './account-group';
import { Company } from '../../../auth/src/company/company';

@Entity()
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
}
