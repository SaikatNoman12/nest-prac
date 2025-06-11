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
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { ActiveUserType } from 'src/interfaces/active-user-type.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashProvider: HashingProvider,

    private readonly jwtService: JwtService,
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

    const allTokens = await this.getToken(userFind as User);

    return {
      ...allTokens,
      message: 'User logged in successfully.',
    };
  }

  public async signupUser(createUserDto: CreateUsersDto) {
    return this.userService.createUser(createUserDto);
  }

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify refresh token
      const payload = await this.jwtService.verifyAsync<{ sub: number }>(
        refreshTokenDto.refreshToken,
        {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );

      const userId = payload.sub;

      if (!userId) {
        throw new UnauthorizedException('Invalid refresh token payload.');
      }

      const user = await this.userService.getSingleUser(userId);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      return this.getToken(user);
    } catch (error) {
      throw new UnauthorizedException(
        error,
        'Invalid or expired refresh token.',
      );
    }
  }

  public async getToken(user: User) {
    const accessPayload: Partial<ActiveUserType> = {
      email: user.email,
    };

    const accessTokenPromise = this.signToken<Partial<ActiveUserType>>(
      user.id,
      this.authConfiguration.expiresIn,
      accessPayload,
    );

    const refreshTokenPromise = this.signToken(
      user.id,
      this.authConfiguration.refreshTokenExpiresIn,
    );

    // Parallel execution for better performance
    const [access, refresh] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      access,
      refresh,
      success: true,
    };
  }
}
