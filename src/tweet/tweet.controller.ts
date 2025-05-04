import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetDto } from './dtos/tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

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

  @Patch(':tweetId')
  updateTweet(
    @Param('tweetId', ParseIntPipe) tweetId: number,
    @Body() tweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.updateTweet(tweetId, tweetDto);
  }

  @Delete(':tweetId')
  deleteTweet(@Param('tweetId', ParseIntPipe) tweetId: number) {
    return this.tweetService.deleteTweet(tweetId);
  }
}
