import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './entity/hashtag.entity';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dtos/hashtag.dto';
import { UpdateHashtagDto } from './dtos/uupdate-hashtag.dto';

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
    return await this.hashtagRepository.save(newHashtag);
  }

  public async getHashtags(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: { id: In(hashtags) },
    });
  }

  public async updateHashtag(hashId: number, hashData: UpdateHashtagDto) {
    const existingHashtag = await this.hashtagRepository.findOne({
      where: { id: hashId },
    });
    if (!existingHashtag) {
      return 'Hashtag not found';
    }
    if (hashData.text === '') {
      return 'Hashtag text cannot be empty';
    }
    existingHashtag.id = hashId;
    existingHashtag.text = hashData.text ?? existingHashtag.text;

    return await this.hashtagRepository.save(existingHashtag);
  }

  public async deleteHashtag(hashId: number) {
    await this.hashtagRepository.delete({ id: hashId });
    return 'Hashtag deleted successfully';
  }

  public async softDeleteHashtag(hashId: number) {
    await this.hashtagRepository.softDelete({ id: hashId });

    return 'Hashtag soft deleted successfully';
  }
}
