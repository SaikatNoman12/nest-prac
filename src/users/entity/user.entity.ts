import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '100',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: '10',
    nullable: true,
  })
  gender: string;

  @Column({
    type: 'boolean',
  })
  isMarried: boolean;
}
