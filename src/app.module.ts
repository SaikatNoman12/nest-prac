import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';

@Module({
  imports: [
    UsersModule,
    TweetModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: true,
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'HelloNomaan123',
        database: 'nestjs',
      }),
    }),
    ProfileModule,
    HashtagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
