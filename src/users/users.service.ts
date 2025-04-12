import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users: { id?: number; name: string; age: number; gender: string }[] = [
    {
      id: 1,
      name: 'Jhon',
      age: 10,
      gender: 'male',
    },
    {
      id: 2,
      name: 'Deo',
      age: 16,
      gender: 'male',
    },
    {
      id: 3,
      name: 'karina',
      age: 20,
      gender: 'female',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getSingleUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createNewUser(userData: {
    id?: number;
    name: string;
    age: number;
    gender: string;
  }) {
    return this.users.push({
      ...userData,
      id: (this.users.at(-1)?.id || 0) + 1,
    });
  }
}
