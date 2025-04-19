import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('gender') gender: string) {
    const users = new UserService().getAllUsers();
    if (gender) {
      return users.filter((user) => user.gender === gender);
    }
    return users;
  }

  @Get(':id')
  getSingleUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('currentPage', new DefaultValuePipe(1), ParseIntPipe)
    currentPage: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    const user = new UserService().getSingleUser(id);
    console.log('currentPage', currentPage);
    console.log('pageSize', pageSize);
    return user;
  }

  @Post('create')
  createNewUser() {
    const newUser = {
      name: 'Khan',
      age: 30,
      gender: 'male',
      email: 'abc@gmail.com',
    };
    const postUser = new UserService();
    postUser.createNewUser(newUser);
    return 'User create successfully!';
  }
}
