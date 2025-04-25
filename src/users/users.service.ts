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
    const user = await this.userRepository.findOne({
      where: { email: userDto.email, username: userDto.username },
    });

    if (user) {
      if (user.email === userDto.email && user.username === userDto.username) {
        return 'This username and email already exist!';
      }
      return user.email === userDto.email
        ? 'This email is already registered!'
        : 'This username is already taken!';
    }

    let newUser = this.userRepository.create(userDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
