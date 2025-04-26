import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Profile } from 'src/profile/entity/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  public async getAllUsers() {
    return this.userRepository.find();
  }

  public async createUser(userDto: CreateUsersDto) {
    const [existingEmail, existingUsername] = await Promise.all([
      this.userRepository.findOne({ where: { email: userDto.email } }),
      this.userRepository.findOne({ where: { username: userDto.username } }),
    ]);

    if (existingEmail && existingUsername) {
      return 'Both email and username already exist.';
    } else if (existingEmail) {
      return 'Email already exists.';
    } else if (existingUsername) {
      return 'Username already exists.';
    }

    /*    
      I solved this error use DeepPartial<>
      const user = plainToClass(User, userDto);

      if (user.profile) {
        user.profile = plainToClass(Profile, userDto.profile);
      } 
    */
    const profile = this.profileRepository.create(userDto.profile ?? {});
    await this.profileRepository.save(profile);

    let newUser = this.userRepository.create(userDto as DeepPartial<Profile>);
    newUser.profile = profile;
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
