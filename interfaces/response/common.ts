export interface BaseResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface BaseResponsePagination<T> extends BaseResponse<T> {
  totalRecord: number;
  totalPaging: number;
  pageSize: number;
  pageIndex: number;
}

export interface PaginationParam {
  pageSize?: number;
  pageIndex?: number;
}
