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

  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  @IsNotEmpty()
  hashtags?: number[];
}
