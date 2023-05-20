import request from 'utils/request';
import { AxiosResponse } from 'axios';
import {
  BaseResponse,
  BaseResponsePagination,
  PaginationParam,
} from 'interfaces/response/common';
import {
  ProvinceEntity,
  DistrictEntity,
  WardEntity,
  AddressEntity,
  CreateShippingAddressData,
  UserEntity,
  UpdateProfileParams,
  SystemStatusData,
  LoginSocialData,
  NotificationEntity,
  OrderHistoryEntity,
  BidHistoryEntity,
  ProductFavoriteHistoryEntity,
} from 'interfaces/types/user';
import {
  IAuthReponseSignIn,
  IAuthRequestSignIn,
} from 'interfaces/response/auth/user';

export const checkUserExit = (
  data: IAuthRequestSignIn,
): Promise<AxiosResponse<BaseResponse<any>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: '/api/v1/auth/signin/verify',
    method: 'POST',
    data,
  });

export const loginWithUserPass = (
  data: IAuthRequestSignIn,
): Promise<AxiosResponse<BaseResponse<LoginSocialData>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: '/api/v1/auth/signin',
    method: 'POST',
    data,
  });

export const getProvince = (): Promise<
  AxiosResponse<BaseResponse<ProvinceEntity[]>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: '/api/v1/address/province',
    method: 'GET',
  });

export const getDistrict = (
  provinceId: string,
): Promise<AxiosResponse<BaseResponse<DistrictEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/address/district/${provinceId}`,
    method: 'GET',
  });

export const getWard = (
  districtId: string,
): Promise<AxiosResponse<BaseResponse<WardEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/address/ward/${districtId}`,
    method: 'GET',
  });

export const getShippingAddressServices = (): Promise<
  AxiosResponse<BaseResponse<AddressEntity[]>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/address`,
    method: 'GET',
  });

export const createShippingAddressServices = (
  data: CreateShippingAddressData,
): Promise<AxiosResponse<BaseResponse<AddressEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/address`,
    method: 'POST',
    data,
  });

export const deleteShippingAddressServices = (
  data: string,
): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/address/${data}`,
    method: 'DELETE',
  });

export const updateShippingAddressServices = (
  id: string,
  data: CreateShippingAddressData,
): Promise<AxiosResponse<BaseResponse<AddressEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/address/${id}`,
    method: 'PUT',
    data,
  });

export const getUserProfileServices = (): Promise<
  AxiosResponse<BaseResponse<UserEntity>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users`,
    method: 'GET',
  });

export const updateUserProfileServices = (
  data: UpdateProfileParams,
): Promise<AxiosResponse<BaseResponse<UserEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users`,
    method: 'PUT',
    data,
  });

export const updateAvatarUser = (
  data: FormData,
): Promise<AxiosResponse<BaseResponse<UserEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/avatar`,
    method: 'PUT',
    data,
  });

export const getSystemStatusServices = (): Promise<
  AxiosResponse<BaseResponse<SystemStatusData>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/systems/status`,
    method: 'GET',
  });

export const logOutServices = (data: {
  token: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/logout`,
    method: 'POST',
    data,
  });

export interface NotificationParam extends PaginationParam {
  type: number;
}

export const getNotificationServices = (
  params: NotificationParam,
): Promise<AxiosResponse<BaseResponsePagination<NotificationEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/notifications`,
    method: 'GET',
    params,
  });

export const markReadNotificationServices = (): Promise<
  AxiosResponse<BaseResponse<any>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/notifications/status`,
    method: 'GET',
  });

export interface PaginationParamHistoryOrder extends PaginationParam {
  review?: number;
}

export const getOrderHistoryServices = (
  params: PaginationParamHistoryOrder,
): Promise<AxiosResponse<BaseResponsePagination<OrderHistoryEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/orders/history`,
    method: 'GET',
    params,
  });

export interface BidHistoryParams extends PaginationParam {
  type: number;
}

export const getBidHistoryServices = (
  params: BidHistoryParams,
): Promise<AxiosResponse<BaseResponsePagination<BidHistoryEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bidding/history/${params.type}`,
    method: 'GET',
    params: {
      pageSize: params.pageSize,
      pageIndex: params.pageIndex,
    },
  });

export const getProductFavoriteHistoryServices = (
  params: PaginationParam,
): Promise<
  AxiosResponse<BaseResponsePagination<ProductFavoriteHistoryEntity[]>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/products/history/favourite`,
    method: 'GET',
    params,
  });

export const requestAddPhoneNumber = (params: {
  phone: string;
  regionCode: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/phone`,
    method: 'GET',
    params,
  });

export const submitAddPhoneNumber = (params: {
  key: string;
  phone: string;
  regionCode: string;
  otp: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/phone`,
    method: 'POST',
    data: params,
  });
