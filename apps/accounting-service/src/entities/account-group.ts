import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountSubType } from './account-sub-type';
import { Account } from './account';
import { BalanceNature } from './balance-nature';
import { AccountType } from './account-type';

@Entity()
export class AccountGroup {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'account_group_id',
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
    name: 'code',
  })
  code: string;

  @ManyToOne(() => AccountSubType, { eager: true })
  @JoinColumn()
  accountSubType: AccountSubType;

  @Column({
    type: 'enum',
    name: 'balance_nature',
    enum: BalanceNature,
    default: BalanceNature.DEBIT,
  })
  balanceNature: BalanceNature;
}
