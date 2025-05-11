import { Injectable, NotFoundException } from '@nestjs/common';
import { TweetDto } from './dtos/tweet.dto';
import { UserService } from 'src/users/users.service';
import { Tweet } from './entity/tweet.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { GetTweetQueryPaginationDto } from './dtos/get-tweet-query.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,

    private hashtagService: HashtagService,
  ) {}

  public async getAllTweets(paginationQueryDto: GetTweetQueryPaginationDto) {
    const allTweets = await this.tweetRepository.find({
      skip: (paginationQueryDto?.page - 1) * paginationQueryDto?.limit,
      take: paginationQueryDto.limit,
      relations: {
        user: true,
      },
    });
    return allTweets;
  }

  public async getUserTweets(userId: number) {
    const user = await this.userService.getSingleUser(userId);

    if (!user) {
      throw new NotFoundException(`User with ${userId} not found!`);
    }

    const tweets = await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
        hashtags: true,
      },
    });
    return tweets;
  }

  public async createTweet(tweetDto: TweetDto) {
    const user = await this.userService.getSingleUser(tweetDto.userId);

    const hashtags =
      tweetDto.hashtags && tweetDto.hashtags.length
        ? await this.hashtagService.getHashtags(tweetDto.hashtags)
        : [];

    const newTweet = this.tweetRepository.create({
      ...tweetDto,
      hashtags,
      user: user as DeepPartial<Tweet>,
    });

    const savedTweet = await this.tweetRepository.save(newTweet);
    return savedTweet;
  }

  public async updateTweet(tweetId: number, tweetDto: UpdateTweetDto) {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
      relations: {
        hashtags: true,
      },
    });
    if (!tweet) {
      return 'Tweet not found';
    }

    if (tweetDto.text === '') {
      return 'Text cannot be empty';
    }
    tweet.id = tweetId;
    tweet.text = tweetDto.text ?? tweet.text;
    tweet.image = tweetDto.image ?? tweet.image;
    if (tweetDto.hashtags) {
      const hashtags = tweetDto.hashtags
        ? await this.hashtagService.getHashtags(tweetDto.hashtags)
        : [];
      tweet.hashtags = hashtags;
    }

    if (!tweetDto.hashtags) {
      console.log('tweet.hashtags', tweet.hashtags);
    }

    return await this.tweetRepository.save(tweet);
  }

  public async deleteTweet(tweetId: number) {
    await this.tweetRepository.delete({ id: tweetId });
    return 'Tweet deleted successfully';
  }
}
