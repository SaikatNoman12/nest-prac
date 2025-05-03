import { Body, Controller, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dtos/hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post('create')
  async createHashtag(@Body() createDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createDto);
  }
}
