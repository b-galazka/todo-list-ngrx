export interface IPaginationParams {
  offset: number;
  limit: number;
}

export interface IPagination {
  prev?: IPaginationParams;
  next?: IPaginationParams;
}

export interface IServerResponse<T> {
  data: T;
  pagination?: IPagination;
}
