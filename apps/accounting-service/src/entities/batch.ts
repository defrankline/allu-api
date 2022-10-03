import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'batch_id',
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
    nullable: false,
    unique: true,
    default: '',
    name: 'description',
  })
  description: string;

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
}
