import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BalanceNature } from './balance-nature';
import { AccountSubType } from './account-sub-type';

@Entity()
export class AccountType {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'account_type_id',
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

  @Column({
    type: 'enum',
    name: 'balance_nature',
    enum: BalanceNature,
    default: BalanceNature.DEBIT,
  })
  balanceNature: BalanceNature;
}
