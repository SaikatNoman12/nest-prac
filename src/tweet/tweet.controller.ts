import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetDto } from './dtos/tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { GetTweetQueryPaginationDto } from './dtos/get-tweet-query.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getAllTweets(@Query() paginationQueryDto: GetTweetQueryPaginationDto) {
    console.log('paginationQueryDto', paginationQueryDto);
    return this.tweetService.getAllTweets(paginationQueryDto);
  }

  @Get(':userId')
  getUserTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.getUserTweets(userId);
  }

  @Post('create')
  createTweet(@Body() tweetDto: TweetDto, @ActiveUser('sub') user) {
    console.log(user);
    // return this.tweetService.createTweet(tweetDto);
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
