import { Body, Controller, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetDto } from './dtos/tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Post('create')
  createTweet(@Body() tweetDto: TweetDto) {
    return this.tweetService.createTweet(tweetDto);
  }
}
