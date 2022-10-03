import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountGroup } from './account-group';
import { AccountSubType } from './account-sub-type';

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

  @ManyToOne(() => AccountSubType, { eager: true })
  @JoinColumn()
  accountGroup: AccountGroup;
}
