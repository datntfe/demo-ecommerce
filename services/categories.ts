import request from 'utils/request';

import { AxiosResponse } from 'axios';
import { IResponseAllCategories } from 'interfaces/response/categories';
import {
  IResponseHomePage,
  IResponseHomePageLuxury,
} from 'interfaces/response/home';
import { BaseResponse } from 'interfaces/response/common';

export const getAllCategories = (
  locale?: string,
): Promise<AxiosResponse<IResponseAllCategories>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'Accept-Language': locale ?? 'vi',
    },
    url: `/api/v1/categories`,
    method: 'GET',
  });

export const getSuggestProduct = (): Promise<AxiosResponse<any>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/home/suggest`,
    method: 'GET',
  });

export const getFavoriteProductst = (): Promise<AxiosResponse<any>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/home`,
    method: 'GET',
  });

export const getHomePageData = (): Promise<AxiosResponse<IResponseHomePage>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/home`,
    method: 'GET',
  });

export const getHomePageLuxuryData = (): Promise<
  AxiosResponse<BaseResponse<IResponseHomePageLuxury>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/home_luxury/website`,
    method: 'GET',
  });

export interface PageResponse {
  id: number;
  title: string;
  content: string;
}

export const getContentPost = (
  postCode: number,
): Promise<AxiosResponse<BaseResponse<PageResponse>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `api/v1/systems/page/${postCode}`,
    method: 'GET',
  });
