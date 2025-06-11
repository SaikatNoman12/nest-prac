import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { AllowAnonymous } from './decorators/allow-anonymous.decorators';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
@AllowAnonymous()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  signupUser(@Body() createUserDto: CreateUsersDto) {
    return this.authService.signupUser(createUserDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
