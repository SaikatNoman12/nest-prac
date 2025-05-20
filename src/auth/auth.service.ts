import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  login(loginDto: LoginDto) {
    const userFind = this.userService.findOneUser(loginDto.email);

    return userFind;
  }

  public async signupUser(createUserDto: CreateUsersDto) {
    return this.userService.createUser(createUserDto);
  }
}
