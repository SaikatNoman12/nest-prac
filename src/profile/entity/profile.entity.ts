import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  gender: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profileImage: string;
}
