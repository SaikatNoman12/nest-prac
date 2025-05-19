import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Profile } from 'src/profile/entity/profile.entity';
import { Tweet } from 'src/tweet/entity/tweet.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Profile, Tweet]), PaginationModule],
  exports: [UserService],
})
export class UsersModule {}
