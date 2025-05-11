import { IntersectionType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class GetTweetQueryPaginationDto extends IntersectionType(
  PaginationQueryDto,
) {
  @IsOptional()
  @IsDate()
  startDate: Date = new Date();

  @IsOptional()
  @IsDate()
  endDate: Date = new Date();
}
