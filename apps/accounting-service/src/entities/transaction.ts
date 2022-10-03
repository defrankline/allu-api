import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { randomUUID } from 'crypto';
import { Account } from './account';
import { Batch } from './batch';

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
}
