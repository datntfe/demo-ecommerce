import { AxiosResponse } from 'axios';
import {
  BaseResponse,
  BaseResponsePagination,
  PaginationParam,
} from 'interfaces/response/common';
import { IBiddingStarResponse, User } from 'interfaces/types/lastedBidding';
import request from 'utils/request';

export const startBiddingSKU = (
  sku: string,
): Promise<AxiosResponse<BaseResponse<IBiddingStarResponse>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/hiddenprice/start`,
    method: 'POST',
    data: { sku },
  });
export const depositBiddingSKU = (
  sku: string,
): Promise<AxiosResponse<BaseResponse<IBiddingStarResponse>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/hiddenprice/deposit`,
    method: 'POST',
    data: { sku },
  });

export const viewRealTimePriceBiddingSKU = (
  sku: string,
): Promise<AxiosResponse<BaseResponse<IBiddingStarResponse>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/hiddenprice/view`,
    method: 'POST',
    data: { sku },
  });

export const buyMoreTimeBiddingSKU = (
  sku: string,
): Promise<AxiosResponse<BaseResponse<IBiddingStarResponse>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/hiddenprice/extend`,
    method: 'POST',
    data: { sku },
  });

export const getPurchaseBiddingSKU = (
  sku: string,
  params?: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<User[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/hiddenprice/history/${sku}`,
    method: 'GET',
    params,
  });

export interface PriceHistory {
  id: string;
  wallet: string;
  point: number;
  price: string;
  createAt: string;
  type: number;
}

export const getHistoryBiddingDetailSKU = (
  id: string,
  params?: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<PriceHistory[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/hiddenprice/history/detail/${id}`,
    method: 'GET',
    params,
  });

export const getPurchaseBiddingDetailSKU = (
  sku: string,
  params?: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<PriceHistory[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/hiddenprice/product/${sku}`,
    method: 'GET',
    params,
  });
