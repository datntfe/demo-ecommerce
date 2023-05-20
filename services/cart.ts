import { AxiosResponse } from 'axios';
import { IResponseStoreBiddingCart, IResponseItemCart, IResponseStoreCart } from 'interfaces/response/cart';
import { BaseResponse } from 'interfaces/response/common';
import request from 'utils/request';

export const addSkuToCart = (
  productId: number,
  sku: string,
  qty = 1,
  //   token = '',
): Promise<AxiosResponse<BaseResponse<IResponseItemCart>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      //   Authorization: `Bearer ${token}`,
    },
    url: `/api/v1/carts/cart`,
    method: 'POST',
    data: { productId, sku, qty },
  });

export const getCartItems = (): Promise<AxiosResponse<BaseResponse<Array<IResponseItemCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/carts/cart`,
    method: 'GET',
  });

export const putCartItems = (
  itemId: string,
  productId: number,
  sku: string,
  qty = 1,
): Promise<AxiosResponse<BaseResponse<Array<IResponseStoreCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/carts/${itemId}`,
    method: 'PUT',
    data: {
      productId,
      sku,
      qty,
    },
  });

export const removeCartItem = (itemId: string): Promise<AxiosResponse<BaseResponse<Array<IResponseStoreCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/carts/${itemId}`,
    method: 'DELETE',
  });

export const checkedItemCart = (cartIds: string[]): Promise<AxiosResponse<BaseResponse<Array<IResponseStoreCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/carts/sync`,
    method: 'PUT',
    data: { cartIds },
  });

export const checkedItemCartById = (cartIds: string): Promise<AxiosResponse<BaseResponse<Array<IResponseStoreCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/carts/sync/${cartIds}`,
    method: 'PUT',
  });

export const getCartBiddingItems = (): Promise<AxiosResponse<BaseResponse<Array<IResponseStoreBiddingCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bidding_carts/cart`,
    method: 'GET',
  });

export const checkedItemBiddingCartById = (
  cartIds: string,
): Promise<AxiosResponse<BaseResponse<Array<IResponseStoreBiddingCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bidding_carts/sync/${cartIds}`,
    method: 'PUT',
  });

export const checkedItemBiddingCart = (
  cartIds: string[],
): Promise<AxiosResponse<BaseResponse<Array<IResponseStoreBiddingCart>>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bidding_carts/sync`,
    method: 'PUT',
    data: { cartIds },
  });
