import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { UserService } from 'src/users/users.service';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashProvider: HashingProvider,
  ) {}

  public async login(loginDto: LoginDto) {
    const userFind = await this.userService.findOneUser(loginDto.email);

    const isValidPassword = await this.hashProvider.comparePassword(
      loginDto.password,
      userFind.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Incorrect Password!');
    }

    return {
      data: userFind,
      success: true,
      message: 'User logged in successfully.',
    };
  }

  public async signupUser(createUserDto: CreateUsersDto) {
    return this.userService.createUser(createUserDto);
  }
}
