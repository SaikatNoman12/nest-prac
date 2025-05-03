import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  text: string;
}
