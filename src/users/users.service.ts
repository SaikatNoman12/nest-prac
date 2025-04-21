import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: {
    id: number;
    name: string;
    isMarried: boolean;
    gender?: string;
    email: string;
    password: string;
  }[] = [
    {
      id: 1,
      name: 'Jhon',
      isMarried: true,
      gender: 'male',
      email: 'abc@gmail.com',
      password: 'Abc123123@',
    },
    {
      id: 2,
      name: 'Deo',
      isMarried: true,
      gender: 'male',
      email: 'abc1@gmail.com',
      password: 'Abc123123@',
    },
    {
      id: 3,
      name: 'karina',
      isMarried: true,
      gender: 'female',
      email: 'abc2@gmail.com',
      password: 'Abc123123@',
    },
  ];

  getAllUsers() {
    if (this.authService.isUserLoggedIn) {
      return this.users;
    }
    return [];
  }

  getSingleUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createNewUser(userData: {
    id: number;
    name: string;
    isMarried: boolean;
    gender?: string;
    email: string;
    password: string;
  }) {
    return this.users.push({
      ...userData,
      id: (this.users.at(-1)?.id || 0) + 1,
    });
  }
}
