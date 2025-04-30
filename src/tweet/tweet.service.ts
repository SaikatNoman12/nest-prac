import { Injectable } from '@nestjs/common';
import { TweetDto } from './dtos/tweet.dto';
import { UserService } from 'src/users/users.service';
import { Tweet } from './entity/tweet.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async getUserTweets(userId: number) {
    const tweets = await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
      },
    });
    return tweets;
  }

  public async createTweet(tweetDto: TweetDto) {
    const user = await this.userService.getSingleUser(tweetDto.userId);

    const newTweet = this.tweetRepository.create({
      ...tweetDto,
      user: user as DeepPartial<Tweet>,
    });

    const savedTweet = await this.tweetRepository.save(newTweet);
    return savedTweet;
  }
}
