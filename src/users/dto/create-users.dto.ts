import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsString({ message: 'Name should be string!' })
  @MinLength(3, { message: 'Name should be empty! minium 3.' })
  @MaxLength(150, { message: 'Name should be lower then 150.' })
  username: string;

  @IsEmail()
  @MaxLength(100, { message: 'Email should be lower then 100.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password should be empty! minium 8.' })
  @MaxLength(100, { message: 'Password should be lower then 100.' })
  password: string;
}
