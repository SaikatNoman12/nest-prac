import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('all-user')
  getAllUsers(@Query() paginationDto: PaginationQueryDto) {
    return this.userService.getAllUsers(paginationDto);
  }

  // @Post('create')
  // createUser(@Body() userDto: CreateUsersDto) {
  //   return this.userService.createUser(userDto);
  // }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getSingleUser(userId);
  }
}
