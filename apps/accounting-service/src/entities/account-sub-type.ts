import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountType } from './account-type';
import { AccountGroup } from './account-group';

@Entity()
export class AccountSubType {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'account_sub_type_id',
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

  @ManyToOne(() => AccountType, { eager: true })
  @JoinColumn()
  accountType: AccountType;
}
