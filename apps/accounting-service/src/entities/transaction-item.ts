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

@Entity()
export class TransactionItem {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'transaction_item_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: 0,
    type: 'bigint',
    name: 'amount',
  })
  amount: number;

  @ManyToOne(() => Transaction, { eager: true })
  @JoinColumn()
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
