import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

    let newUser = this.userRepository.create(userDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
