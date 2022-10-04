import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { randomUUID } from 'crypto';
import { Account } from './account';
import { Batch } from './batch';
import { TransactionItem } from './transaction-item';
import { DecimalTransformer } from '@app/common/decimal-transformer';
import Decimal from 'decimal.js';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'transaction_id',
  })
  id: number;

  @Column({
    nullable: false,
    unique: true,
    default: randomUUID().toString(),
    name: 'number',
  })
  number: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    name: 'date',
    default: new Date(),
  })
  date: Date;

  @Column({
    nullable: false,
    default: 0,
    type: 'bigint',
    name: 'company',
  })
  company: number;

  @ManyToOne(() => Batch, { eager: true })
  @JoinColumn()
  batch: Batch;

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.transaction,
  )
  items: TransactionItem[];

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  public amount: Decimal;
}
