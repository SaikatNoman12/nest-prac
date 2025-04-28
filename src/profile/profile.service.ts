import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entity/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  getAllProfile() {
    return this.profileRepository.find({
      relations: {
        user: true,
      },
    });
  }

  public async deleteProfile(id: number) {
    await this.profileRepository.delete(id);

    return { delete: true };
  }
}
