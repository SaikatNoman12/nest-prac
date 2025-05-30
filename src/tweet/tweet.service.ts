import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { TweetDto } from './dtos/tweet.dto';
import { UserService } from 'src/users/users.service';
import { Tweet } from './entity/tweet.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { GetTweetQueryPaginationDto } from './dtos/get-tweet-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { PaginatedInterface } from 'src/common/pagination/paginated';
import { Hashtag } from 'src/hashtag/entity/hashtag.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private hashtagService: HashtagService,

    private readonly paginationProvider: PaginationProvider<Tweet>,
  ) {}

  public async getAllTweets(
    paginationQueryDto: GetTweetQueryPaginationDto,
  ): Promise<PaginatedInterface<Tweet>> {
    return await this.paginationProvider.paginateQuery(
      paginationQueryDto,
      this.tweetRepository,
    );
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

  public async createTweet(tweetDto: TweetDto, userId: number) {
    let user: User | undefined = undefined;
    let hashtags: Hashtag[] | undefined = undefined;

    try {
      user = await this.userService.getSingleUser(userId);
      if (tweetDto?.hashtags) {
        hashtags =
          tweetDto?.hashtags && tweetDto?.hashtags?.length
            ? await this.hashtagService.getHashtags(tweetDto.hashtags)
            : [];
      }
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (tweetDto?.hashtags?.length !== hashtags?.length) {
      throw new BadRequestException('Invalid hashtags provided');
    }

    const newTweet = this.tweetRepository.create({
      ...tweetDto,
      hashtags,
      user: user as DeepPartial<Tweet>,
    });

    try {
      const savedTweet = await this.tweetRepository.save(newTweet);
      return savedTweet;
    } catch (error) {
      throw new ConflictException({
        description: 'Failed to create tweet',
        cause: error,
      });
    }
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
