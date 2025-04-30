import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetDto } from './dtos/tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get(':userId')
  getUserTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.getUserTweets(userId);
  }

  @Post('create')
  createTweet(@Body() tweetDto: TweetDto) {
    return this.tweetService.createTweet(tweetDto);
  }
}
