import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from './transaction';
import { Account } from './account';
import { BalanceNature } from './balance-nature';
import Decimal from 'decimal.js';
import { DecimalTransformer } from '@app/common/decimal-transformer';

@Entity()
export class TransactionItem {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'transaction_item_id',
  })
  id: number;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  amount: Decimal;

  @ManyToOne(() => Transaction, (transaction) => transaction.items, {
    eager: true,
  })
  transaction: Transaction;

  @ManyToOne(() => Account, { eager: true })
  @JoinColumn()
  account: Account;

  @Column({
    type: 'enum',
    name: 'balance_nature',
    enum: BalanceNature,
  })
  balanceNature: BalanceNature;

  @Column({
    nullable: false,
    default: 0,
    type: 'bigint',
    name: 'company',
  })
  company: number;
}
