export interface PaginationDto {
  page: number;
  limit: number;
  skip: number;
}

export interface PagedResultDto<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
