import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'First name up to 150 character not supported!' })
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Last Name Up to 150 character not supported!' })
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'Gender Up to 10 character not supported!' })
  gender: string;

  @IsOptional()
  @IsDate()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  profileImage: string;
}
