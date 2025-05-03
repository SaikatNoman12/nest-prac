import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './entity/hashtag.entity';
import { Repository } from 'typeorm';
import { CreateHashtagDto } from './dtos/hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  public async createHashtag(createDto: CreateHashtagDto) {
    const existingHashtag = await this.hashtagRepository.findOne({
      where: { text: createDto.text },
    });

    if (existingHashtag) {
      return 'This hashtag already exists';
    }

    const newHashtag = this.hashtagRepository.create(createDto);
    return this.hashtagRepository.save(newHashtag);
  }
}
