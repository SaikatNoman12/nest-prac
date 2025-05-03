import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  hashtags: number[];
}
