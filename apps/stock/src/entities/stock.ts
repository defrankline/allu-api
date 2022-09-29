import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'stock_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    unique: true,
    name: 'name',
  })
  name: string;
}
