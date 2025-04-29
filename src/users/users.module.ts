import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Profile } from 'src/profile/entity/profile.entity';
import { Tweet } from 'src/tweet/entity/tweet.entity';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Profile, Tweet]),
  ],
  exports: [UserService],
})
export class UsersModule {}
