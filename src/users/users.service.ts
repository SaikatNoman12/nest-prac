import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConnectionError } from 'src/error/error';
import { UserAlreadyExistsException } from 'src/error/user-already-exists.exception';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { PaginatedInterface } from 'src/common/pagination/paginated';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { HashingProvider } from 'src/auth/provider/hashing.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly paginationProvider: PaginationProvider<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashProvider: HashingProvider,
  ) {}

  public async getAllUsers(
    paginationDto: PaginationQueryDto,
  ): Promise<PaginatedInterface<User>> {
    try {
      const developmentType = this.configService.get<string>('ENV_MODE');
      console.log('ENV_MODE IN ENV', developmentType);

      const env = process.env.NODE_ENV;
      console.log('NODE_ENV IN SYSTEM', env);

      return this.paginationProvider.paginateQuery(
        paginationDto,
        this.userRepository,
        null,
        ['profile'],
      );
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
    try {
      const [existingEmail, existingUsername] = await Promise.all([
        this.userRepository.findOne({ where: { email: userDto.email } }),
        this.userRepository.findOne({ where: { username: userDto.username } }),
      ]);

      /* 
      if (existingEmail && existingUsername) {
          throw new BadRequestException('Both email and username already exist.');
        } else if (existingEmail) {
          throw new BadRequestException('Email already exists.');
        } else if (existingUsername) {
          throw new BadRequestException('Username already exists.');
        } 
      */
      if (existingEmail && existingUsername) {
        throw new UserAlreadyExistsException(
          'email & username',
          `'${userDto.email}' & '${userDto.username}'`,
        );
      } else if (existingEmail) {
        throw new UserAlreadyExistsException('email', `'${userDto.email}'`);
      } else if (existingUsername) {
        throw new UserAlreadyExistsException(
          'username',
          `'${userDto.username}'`,
        );
      }

      // const user = plainToClass(User, userDto);
      // user.profile = plainToClass(Profile, user.profile ?? {});
      // let newUser = this.userRepository.create(user);
      // newUser = await this.userRepository.save(newUser);
      // return newUser;

      const newUser = await this.userRepository.save(
        this.userRepository.create({
          ...userDto,
          password: await this.hashProvider.hashPassword(userDto.password),
          profile: userDto.profile ?? {},
        }),
      );
      return newUser;
    } catch (err) {
      if (err instanceof DatabaseConnectionError) {
        throw new RequestTimeoutException(
          'An error occurred. Please try again.',
          {
            description: `Couldn't connect to the database! Error: ${err.description}`,
          },
        );
      }
      if (err === 'unknown') {
        throw new RequestTimeoutException(
          'An unknown error occurred. Please try again.',
          { description: 'Unknown error type encountered.' },
        );
      }

      throw err;
    }
  }

  public async deleteUser(id: number) {
    // const user = await this.userRepository.findOneBy({ id: id });

    await this.userRepository.delete(id);

    // await this.profileRepository.delete(user?.profile?.id as number);

    return { delete: true };
  }

  public async getSingleUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'This user not found.',
          table: 'users',
        },
        HttpStatus.NOT_FOUND,
        {
          description: 'This user ' + id + ' not found this is users table!',
        },
      );
    }
    return user;
  }

  public async findOneUser(email: string) {
    let user: User | undefined = undefined;

    try {
      user = (await this.userRepository.findOneBy({ email })) as User;
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "User with given email couldn't found!",
      });
    }

    if (!user) {
      throw new UnauthorizedException('User do not exist!');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
