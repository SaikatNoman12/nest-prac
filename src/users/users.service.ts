import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly configService: ConfigService,
  ) {}

  public async getAllUsers() {
    try {
      const developmentType = this.configService.get<string>('ENV_MODE');
      console.log('ENV_MODE IN ENV', developmentType);

      const env = process.env.NODE_ENV;
      console.log('NODE_ENV IN SYSTEM', env);

      return this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new RequestTimeoutException(
          'An error occurred. Please try again.',
          {
            description: `Couldn't connect to the database! Error: ${err.message}`,
          },
        );
      } else {
        throw new RequestTimeoutException(
          'An unknown error occurred. Please try again.',
          {
            description: "Couldn't connect to the database!",
          },
        );
      }
    }
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

  public async deleteUser(id: number) {
    // const user = await this.userRepository.findOneBy({ id: id });

    await this.userRepository.delete(id);

    // await this.profileRepository.delete(user?.profile?.id as number);

    return { delete: true };
  }

  public async getSingleUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
