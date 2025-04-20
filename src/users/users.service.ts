import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users: {
    id: number;
    name: string;
    isMarried: boolean;
    gender?: string;
    email: string;
  }[] = [
    {
      id: 1,
      name: 'Jhon',
      isMarried: true,
      gender: 'male',
      email: 'abc@gmail.com',
    },
    {
      id: 2,
      name: 'Deo',
      isMarried: true,
      gender: 'male',
      email: 'abc@gmail.com',
    },
    {
      id: 3,
      name: 'karina',
      isMarried: true,
      gender: 'female',
      email: 'abc@gmail.com',
    },
  ];

  getAllUsers() {
    return this.users;
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
  }) {
    return this.users.push({
      ...userData,
      id: (this.users.at(-1)?.id || 0) + 1,
    });
  }
}
