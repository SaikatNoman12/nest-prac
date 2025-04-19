import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(3, { message: 'Name should be empty!' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsBoolean()
  isMarried: boolean;
}
