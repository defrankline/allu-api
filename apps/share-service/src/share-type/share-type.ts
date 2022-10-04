import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShareType {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'share_type_id',
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
    default: true,
    name: 'mandatory',
  })
  mandatory: boolean;

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
    name: 'debit_account',
  })
  debitAccount: number;

  @Column({
    nullable: false,
    default: 0,
    type: 'bigint',
    name: 'credit_account',
  })
  creditAccount: number;
}
