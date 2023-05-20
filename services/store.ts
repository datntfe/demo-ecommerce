import { AxiosResponse } from 'axios';
import {
  BaseResponse,
  BaseResponsePagination,
  PaginationParam,
} from 'interfaces/response/common';
import { HomePageProduct } from 'interfaces/response/home';
import { StoreEntity } from 'interfaces/response/store';
import request from 'utils/request';

export const getStoreDetail = (
  storeId: string,
): Promise<
  AxiosResponse<
    BaseResponse<{ store: StoreEntity; products: HomePageProduct[] }>
  >
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/stores/${storeId}`,
    method: 'GET',
  });

export const getStoreProduct = (
  storeId: string,
  params: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<HomePageProduct[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/stores/${storeId}/product`,
    method: 'GET',
    params,
  });
