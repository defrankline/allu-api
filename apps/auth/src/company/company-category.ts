import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyCategory {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'company_category_id',
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
    name: 'number',
  })
  number: string;
}
