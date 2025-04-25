import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MaxLength(150, { message: 'First name up to 150 character not supported!' })
  @IsOptional()
  firstName: string;

  @IsString()
  @MaxLength(150, { message: 'Last Name Up to 150 character not supported!' })
  @IsOptional()
  lastName: string;

  @IsString()
  @MaxLength(10, { message: 'Gender Up to 10 character not supported!' })
  @IsOptional()
  gender: string;

  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  profileImage: string;
}
