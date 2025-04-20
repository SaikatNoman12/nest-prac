import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(@Query() query: GetUsersDto) {
    const users = this.userService.getAllUsers();
    if (query.gender) {
      return users.filter((user) => user.gender === query.gender);
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
    const user = this.userService.getSingleUser(id);
    console.log('currentPage', currentPage);
    console.log('pageSize', pageSize);
    return user;
  }

  @Post('create')
  createNewUser(@Body() user: CreateUsersDto) {
    this.userService.createNewUser(user);
    console.log('user', user instanceof CreateUsersDto);
    return 'User create successfully!';
  }

  @Patch()
  updateUser(@Body() body: UpdateUsersDto) {
    console.log('update', body);
    return 'User updated';
  }
}
