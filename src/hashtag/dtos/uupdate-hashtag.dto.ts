import { PartialType } from '@nestjs/mapped-types';
import { CreateHashtagDto } from './hashtag.dto';

export class UpdateHashtagDto extends PartialType(CreateHashtagDto) {}
