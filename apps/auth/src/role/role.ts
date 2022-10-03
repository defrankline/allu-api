import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'role_id',
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
