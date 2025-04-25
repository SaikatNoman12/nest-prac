import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('all-user')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('create')
  createUser(@Body() userDto: CreateUsersDto) {
    return this.userService.createUser(userDto);
  }
}
