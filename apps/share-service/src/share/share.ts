import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShareType } from '../share-type/share-type';

@Entity()
export class Share {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'share_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: 0.0,
    type: 'numeric',
    name: 'amount',
    precision: 20,
    scale: 2,
  })
  amount: number;

  @ManyToOne(() => ShareType, { eager: true })
  @JoinColumn()
  shareType: ShareType;

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
    name: 'member',
  })
  member: number;

  @Column({
    nullable: false,
    default: false,
    name: 'approved',
  })
  approved: boolean;

  @Column({
    nullable: true,
    default: 0,
    type: 'bigint',
    name: 'approved_by',
  })
  approvedBy: number;

  @Column({
    type: 'timestamptz',
    nullable: false,
    name: 'date',
    default: new Date(),
  })
  date: Date;

  @Column({
    nullable: true,
    default: 0,
    type: 'bigint',
    name: 'debit_account',
  })
  debitAccount: number;

  @Column({
    nullable: true,
    default: 0,
    type: 'bigint',
    name: 'credit_account',
  })
  creditAccount: number;
}
