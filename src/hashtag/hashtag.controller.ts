import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dtos/hashtag.dto';
import { UpdateHashtagDto } from './dtos/uupdate-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post('create')
  async createHashtag(@Body() createDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createDto);
  }

  @Patch(':hashId')
  async updateHashtag(
    @Param('hashId', ParseIntPipe) hashId: number,
    @Body() hashData: UpdateHashtagDto,
  ) {
    return this.hashtagService.updateHashtag(hashId, hashData);
  }

  @Delete(':hashId')
  async deleteHashtag(@Param('hashId', ParseIntPipe) hashId: number) {
    return this.hashtagService.deleteHashtag(hashId);
  }

  @Delete('soft/:hashId')
  async softDeleteHashtag(@Param('hashId', ParseIntPipe) hashId: number) {
    return this.hashtagService.softDeleteHashtag(hashId);
  }
}
