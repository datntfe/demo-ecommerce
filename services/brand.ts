import request from 'utils/request';
import { AxiosResponse } from 'axios';
import { BaseResponse } from 'interfaces/response/common';
import { BrandBanner, HomePageProduct } from 'interfaces/response/home';

export const getAllBrands = (): Promise<AxiosResponse<BaseResponse<BrandBanner[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/brands/brand`,
    method: 'GET',
  });

export const getBrandProducts = (
  brandId: string,
  params: { pageIndex: number },
): Promise<AxiosResponse<BaseResponse<HomePageProduct[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/brands/${brandId}/product`,
    method: 'GET',
    params,
  });

export const getBrandDetail = (
  brandId: string,
): Promise<AxiosResponse<BaseResponse<{ brand: BrandBanner; products: HomePageProduct[] }>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/brands/${brandId}`,
    method: 'GET',
  });
