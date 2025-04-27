import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profile/entity/profile.entity';
import { plainToClass } from 'class-transformer';

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

    // const user = plainToClass(User, userDto);
    // user.profile = plainToClass(Profile, user.profile ?? {});
    // let newUser = this.userRepository.create(user);
    // newUser = await this.userRepository.save(newUser);
    // return newUser;

    const newUser = await this.userRepository.save(
      this.userRepository.create({
        ...userDto,
        profile: userDto.profile ?? {},
      }),
    );
    return newUser;
  }
}
