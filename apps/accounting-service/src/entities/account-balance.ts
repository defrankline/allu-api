import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DecimalTransformer } from '@app/common/decimal-transformer';
import Decimal from 'decimal.js';
import { Transaction } from './transaction';
import { Account } from './account';

@Entity()
export class AccountBalance {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'account_balance_id',
  })
  id: number;

  @ManyToOne(() => Account, { eager: true })
  @JoinColumn()
  account: Account;

  @ManyToOne(() => Transaction, { eager: true })
  @JoinColumn()
  transaction: Transaction;

  @Column({
    type: 'timestamptz',
    nullable: false,
    name: 'date',
    default: new Date(),
  })
  date: Date;

  @Column({
    name: 'balance',
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  balance: Decimal;

  @Column({
    nullable: false,
    default: 0,
    type: 'bigint',
    name: 'company',
  })
  company: number;

  @Column({
    nullable: false,
    default: 0,
    type: 'bigint',
    name: 'financialYear',
  })
  financialYear: number;

  @Column({
    nullable: false,
    default: false,
    name: 'audited',
  })
  audited: boolean;
}
