import { Profile } from 'src/profile/entity/profile.entity';
import { Tweet } from 'src/tweet/entity/tweet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert', 'remove'],
    //  eager: true this use for get relations data
  })
  profile?: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet;
}
