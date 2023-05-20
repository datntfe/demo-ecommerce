import { BaseResponse } from 'interfaces/response/common';
import { IRequestSearchProduct, ProductItem } from 'interfaces/response/products';

export interface IPayloadCartUpdate {
  code: string;
  quanity: number;
}

export interface IPayloadSearchPage {
  response: BaseResponse<ProductItem[]>;
  query: IRequestSearchProduct;
}
