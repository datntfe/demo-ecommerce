import { AxiosResponse } from 'axios';
import { BaseResponse, BaseResponsePagination, PaginationParam } from 'interfaces/response/common';
import {
  WalletHistoryEntity,
  BankAccountEntity,
  TopupData,
  TopupResponse,
  ResponseListBankTopup,
  VoucherXuEntity,
} from 'interfaces/response/wallet';
import { UserEntity } from 'interfaces/types/user';
import request from 'utils/request';

export interface WalletHistoryParam extends PaginationParam {
  type: number;
}

export const getWalletHistoryServices = (
  params: WalletHistoryParam,
): Promise<AxiosResponse<BaseResponsePagination<WalletHistoryEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/wallets/history`,
    method: 'GET',
    params,
  });

export const getShopdiBankAccountServices = (): Promise<AxiosResponse<BaseResponse<BankAccountEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/systems/banks`,
    method: 'GET',
  });

export const topupWalletServices = (data: TopupData): Promise<AxiosResponse<BaseResponse<TopupResponse>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/wallets/topup`,
    method: 'POST',
    data,
  });

export const getListBankTopupServices = (): Promise<AxiosResponse<BaseResponse<ResponseListBankTopup[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/systems/payment_destination`,
    method: 'GET',
  });

export const transferServices = (data: { amount: string; userId: string }): Promise<AxiosResponse<BaseResponse<any>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/wallets/transfer`,
    method: 'POST',
    data,
  });

export const getUserByPhoneServices = (phone: string): Promise<AxiosResponse<BaseResponse<UserEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/${phone}`,
    method: 'GET',
  });

export const getVouchersServices = (
  params?: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<VoucherXuEntity[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: '/api/v1/bc_vouchers/voucher',
    method: 'GET',
    params,
  });

export const claimVoucherServices = (code: string): Promise<AxiosResponse<BaseResponse<VoucherXuEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bc_vouchers/claim/${code}`,
    method: 'POST',
    data: {
      code,
    },
  });

export const checkVouchersServices = (code: string): Promise<AxiosResponse<BaseResponsePagination<VoucherXuEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bc_vouchers/${code}`,
    method: 'GET',
  });
