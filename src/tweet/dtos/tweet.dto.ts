import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TweetDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
