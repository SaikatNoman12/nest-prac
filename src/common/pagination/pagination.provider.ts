import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export class PaginationProvider<T extends ObjectLiteral> {
  public async paginateQuery(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ) {
    const findOptions: FindManyOptions<T> = {
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
      take: paginationQueryDto.limit,
    };

    if (where) {
      findOptions.where = where;
    }

    const allData = await repository.find(findOptions);
    const totalItems = await repository.count();
    const currentPage = paginationQueryDto.page;
    const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);

    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

    return {
      data: allData,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems: totalItems,
        currentPage: currentPage,
        totalPages: totalPages,
      },
      links: {
        first: 1,
        last: totalPages,
        current: currentPage,
        next: nextPage,
        previous: prevPage,
      },
    };
  }
}
