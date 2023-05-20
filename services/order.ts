import { AxiosResponse } from 'axios';

import {
  IResquestCreateOrder,
  OrderEntity,
  IShippingPrice,
  CalculatorShipPriceResponse,
  CalculatorShipPriceDefault,
  OrderEntityExpand,
  IResquestCancelOrder,
  IResquestReviewOrder,
  IResquestFilesImportReviewOrder,
} from 'interfaces/response/order';
import {
  BaseResponse,
  BaseResponsePagination,
  PaginationParam,
} from 'interfaces/response/common';
import request from 'utils/request';

export interface OrderHistoryParam extends PaginationParam {
  status: number;
  keyword?: string;
}

export const getOrderHistoryServices = (
  params: OrderHistoryParam,
): Promise<AxiosResponse<BaseResponsePagination<OrderEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/orders/order`,
    method: 'GET',
    params,
  });

export const submitOrder = (
  data: IResquestCreateOrder,
): Promise<AxiosResponse<BaseResponse<any>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/orders/checkout`,
    method: 'POST',
    data,
  });

export const submitBiddingOrder = (
  data: IResquestCreateOrder,
): Promise<AxiosResponse<BaseResponse<any>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bidding_carts/checkout`,
    method: 'POST',
    data,
  });

export const calculatorShippingPrice = (
  params: IShippingPrice,
): Promise<AxiosResponse<BaseResponse<CalculatorShipPriceResponse[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/shipping/price`,
    method: 'GET',
    params,
  });

export const calculatorShippingPriceDefault = (
  params: IShippingPrice,
): Promise<AxiosResponse<BaseResponse<CalculatorShipPriceDefault>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/shipping/default/price`,
    method: 'GET',
    params,
  });

export const getOrderDetailServices = (
  orderId: string,
): Promise<AxiosResponse<BaseResponse<OrderEntityExpand>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/orders/${orderId}`,
    method: 'GET',
  });

export const cancelOrder = (
  data: IResquestCancelOrder,
): Promise<AxiosResponse<BaseResponse<OrderEntityExpand>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/orders/cancel/${data.id}`,
    method: 'PUT',
    data,
  });

export const returnPlaceOrder = (
  id: number,
): Promise<AxiosResponse<BaseResponse<OrderEntityExpand>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/orders/goods_return/${id}`,
    method: 'POST',
  });

export const submitReviewOrder = (
  data: IResquestReviewOrder,
): Promise<AxiosResponse<BaseResponse<OrderEntityExpand>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/orders/review`,
    method: 'POST',
    data,
  });
