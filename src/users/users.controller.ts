import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    const users = new UserService().getAllUsers();
    return users;
  }

  @Post('create')
  createNewUser() {
    const newUser = { name: 'Khan', age: 30, gender: 'male' };
    const postUser = new UserService();
    postUser.createNewUser(newUser);
    return 'User create successfully!';
  }
}
