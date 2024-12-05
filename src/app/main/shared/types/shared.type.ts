export interface AbstractResponseData {
  nameEn: string;
  nameAr: string;
}

export interface PaginationSearchCriteria {
  take: number;
  skip: number;
}

export enum Pagination {
  TAKE = 10,
  SKIP = 0,
}
