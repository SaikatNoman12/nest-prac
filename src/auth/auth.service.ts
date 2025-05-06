import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  login(loginDto: LoginDto) {
    console.log('auth secret key', this.authConfiguration.sharedSecret);

    return {
      success: 'User logged in successfully!',
      ...loginDto,
    };
  }
}
