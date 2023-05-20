import request from 'utils/request';
import { AxiosResponse } from 'axios';
import { BaseResponse } from 'interfaces/response/common';
import { LoginSocialData, UserEntity } from 'interfaces/types/user';

interface SignupParams {
  username: string;
  password: string;
}

export const signupByEmail = (
  params: SignupParams,
): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/email/signup`,
    method: 'POST',
    data: params,
  });
interface OtpParams {
  username: string;
  password: string;
  code: string;
}

export const confirmOtpCodeByEmail = (
  params: OtpParams,
): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/email/otp`,
    method: 'POST',
    data: params,
  });

export const confirmPinCodeCodeByEmail = (
  params: OtpParams,
): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/email/active`,
    method: 'POST',
    data: params,
  });

export const signupByPhone = (params: {
  phone: string;
  regionCode: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signup`,
    method: 'POST',
    data: params,
  });
interface OtpParams {
  username: string;
  password: string;
  code: string;
}

export const confirmPinOTPByPhone = (params: {
  phone: string;
  code: string;
  regionCode: string;
}): Promise<AxiosResponse<any>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signup/otp`,
    method: 'POST',
    data: params,
  });

export const confirmPinCodeCodeByPhone = (params: {
  phone: string;
  password: string;
  regionCode: string;
  presenterCode?: string;
}): Promise<AxiosResponse<BaseResponse<LoginSocialData>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signup/active`,
    method: 'POST',
    data: params,
  });

export const forgotPassword = (params: {
  phone: string;
  regionCode: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/password/forgot`,
    method: 'POST',
    data: params,
  });

export const confirmOTPForgotPassword = (params: {
  phone: string;
  regionCode: string;
  code: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/password/forgot`,
    method: 'GET',
    params,
  });

export const confirmForgotPassword = (params: {
  key: string;
  phone: string;
  regionCode: string;
  password: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/password/forgot`,
    method: 'PUT',
    data: params,
  });

export const changePassword = (params: {
  oldPassword: string;
  newPassword: string;
}): Promise<AxiosResponse<BaseResponse<string>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/password/change`,
    method: 'POST',
    data: params,
  });

export const loginBySocialServices = (params: {
  access_token: string;
  type: number;
}): Promise<AxiosResponse<BaseResponse<LoginSocialData>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signin-external/web`,
    method: 'GET',
    params,
  });

export const registerSocialServices = (params: {
  access_token: string;
  type: number;
}): Promise<AxiosResponse<BaseResponse<LoginSocialData>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signup-external`,
    method: 'GET',
    params,
  });

export const registerSocialGetOtpServices = (params: {
  access_token: string;
  type: number;
  phone: string;
  regionCode: string;
}): Promise<AxiosResponse<BaseResponse<LoginSocialData>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signup-external/phone`,
    method: 'POST',
    data: params,
  });

export const registerSocialConfirmOtpServices = (params: {
  access_token: string;
  type: number;
  phone: string;
  regionCode: string;
  code: string;
}): Promise<AxiosResponse<BaseResponse<LoginSocialData>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signup-external/otp`,
    method: 'POST',
    data: params,
  });

export const registerSocialActiveServices = (params: {
  access_token: string;
  type: number;
  phone: string;
  regionCode: string;
  code: string;
  password: string;
  presenterCode?: string;
}): Promise<AxiosResponse<BaseResponse<LoginSocialData>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/auth/signup-external/active`,
    method: 'POST',
    data: params,
  });

export const connectSSo = (params: {
  access_token: string;
  type: number;
}): Promise<AxiosResponse<BaseResponse<UserEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/connect-external`,
    method: 'POST',
    data: params,
  });

export const removeSSo = (params: {
  type: number;
}): Promise<AxiosResponse<BaseResponse<UserEntity>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/users/remove-external`,
    method: 'DELETE',
    data: params,
  });
