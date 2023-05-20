import request from 'utils/request';

import { AxiosResponse } from 'axios';
import {
  IAttributeProductValues,
  IReponseProductDetail,
  IReponseProductSkuPrice,
  IRequestSearchProduct,
  ProductItem,
  SearchProduct,
} from 'interfaces/response/products';
import {
  BaseResponse,
  BaseResponsePagination,
  PaginationParam,
} from 'interfaces/response/common';
import { LastedBidding } from 'interfaces/types/lastedBidding';
import {
  HomePageProduct,
  IProduct,
  IResponseBiddingProcess,
} from 'interfaces/response/home';
import qs from 'qs';
import { pickBy } from 'lodash';
import { CategoriesData } from 'interfaces/response/categories';
import { StoreEntity } from 'interfaces/response/store';

export interface ReviewEntity {
  id: number;
  name: string;
  avatar: string;
  rating: string;
  createAt: string;
  reviews: string;
  images: string[];
  feedback: string;
  sku: string;
  productName: string;
  productImage: string;
}

export interface ProductsReviewResponse {
  total: number;
  rating: number;
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
  list: ReviewEntity[];
}

export const getProductsReview = (
  sku: string,
  params: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<ProductsReviewResponse>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: '*',
    },
    url: `/api/v1/products/reviews/${sku}`,
    params,
    method: 'GET',
  });

export const getProductByCategoryId = (
  categoryId: number,
  limit = 20,
  page = 1,
): Promise<AxiosResponse<any>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/products/categories/${categoryId}}?limit=${limit}&page=${page}`,
    method: 'GET',
  });

export const getProductBySku = (
  sku: string,
  token = '',
): Promise<AxiosResponse<IReponseProductDetail>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: `/api/v1/products/${sku}`,
    method: 'GET',
  });

export const getProductRelatedBySku = (
  sku: string,
): Promise<AxiosResponse<BaseResponse<IProduct[]>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/products/related/${sku}`,
    method: 'GET',
  });

export const getLastedBidding = (): Promise<
  AxiosResponse<BaseResponse<Array<LastedBidding>>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bidding/cheapest_succeed`,
    method: 'GET',
  });

export const getBiddingProcessing = (): Promise<
  AxiosResponse<BaseResponse<IResponseBiddingProcess>>
> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/bidding/process`,
    method: 'GET',
  });

export const getSkuPrice = (
  sku: string,
  data: Array<IAttributeProductValues>,
): Promise<AxiosResponse<BaseResponse<IReponseProductSkuPrice>>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/products/${sku}/price`,
    method: 'POST',
    data,
  });

export const searchProduct = (
  data: IRequestSearchProduct,
): Promise<AxiosResponse<BaseResponsePagination<Array<ProductItem>>>> => {
  const cleanedSearchQuery = qs.stringify(
    pickBy(data, (value) => value !== ''),
  );
  return request({
    url: `/api/v1/products/search?${cleanedSearchQuery}`,
    method: 'GET',
  });
};

export interface AttributeEntity {
  attributeName: string;
  attributeCode: string;
  attributeId: string;
  options: [
    {
      value: string;
      label: string;
    },
  ];
}

export type SearchProductResponse = BaseResponsePagination<{
  categories: CategoriesData[];
  products: Array<HomePageProduct>;
  attributes: AttributeEntity[];
  stores: StoreEntity;
}>;

const NOT_ATTRIBUTE = [
  'categoryId',
  'keyword',
  'priceFrom',
  'priceTo',
  'pageSize',
  'pageIndex',
  'rating',
];

export const returnArrayAttribute = (data: any) => {
  let att = '';

  for (const [key, value] of Object.entries(data)) {
    if (!NOT_ATTRIBUTE.includes(key)) {
      att += `${key}=${value}&`;
    }
  }
  const attributes = qs.parse(att);
  return attributes.attributes;
};

export const searchProductPost = (
  data: IRequestSearchProduct,
  locale?: string,
): Promise<AxiosResponse<SearchProductResponse>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'Accept-Language': locale ?? 'vi',
    },
    url: `/api/v1/products/search/luxury`,
    method: 'POST',
    data: { ...data, attributes: returnArrayAttribute(data) },
  });

export const searchStoreProductPost = (
  data: IRequestSearchProduct,
): Promise<AxiosResponse<SearchProductResponse>> =>
  request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    url: `/api/v1/stores/search`,
    method: 'POST',
    data: { ...data, attributes: returnArrayAttribute(data) },
  });

export const getWishListsServices = (
  params: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<ProductItem>>> =>
  request({
    url: `/api/v1/wishlists`,
    method: 'GET',
    params,
  });

export const addWishListsServices = (
  productId: number,
): Promise<AxiosResponse<BaseResponsePagination<ProductItem>>> =>
  request({
    url: `/api/v1/wishlists/${productId}`,
    method: 'POST',
  });

export const removeWishListsServices = (
  wishlistId: number,
): Promise<AxiosResponse<BaseResponsePagination<ProductItem>>> =>
  request({
    url: `/api/v1/wishlists/${wishlistId}`,
    method: 'DELETE',
  });

export interface SuggestResponse {
  titles: string[];
  stores: StoreEntity[];
}

export const getSuggestionServices = (params: {
  keywords: string;
}): Promise<AxiosResponse<BaseResponse<SuggestResponse>>> =>
  request({
    url: `/api/v1/search/suggestion`,
    method: 'GET',
    params,
  });

export const searchStoresServices = (params: {
  keywords?: string;
  pageSize?: number;
  pageIndex?: number;
}): Promise<AxiosResponse<BaseResponsePagination<StoreEntity[]>>> =>
  request({
    url: `/api/v1/stores`,
    method: 'GET',
    params,
  });

export const recommendServices = (
  params?: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<HomePageProduct[]>>> =>
  request({
    url: `/api/v1/products/recommend/luxury`,
    method: 'GET',
    params,
  });

export const getProductsByTypeServices = (
  type: number,
  params?: PaginationParam,
): Promise<AxiosResponse<BaseResponsePagination<HomePageProduct[]>>> =>
  request({
    url: `/api/v1/products/type/${type}`,
    method: 'GET',
    params,
  });
