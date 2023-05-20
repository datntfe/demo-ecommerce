export interface IResponseStoreCart {
  storeId: number;
  name: string;
  logo: string;
  items: IResponseItemCart[];
}

export interface IResponseStoreBiddingCart {
  storeId: number;
  name: string;
  logo: string;
  items: IResponseItemBiddingCart[];
}

export interface IResponseItemCart {
  cartId: string;
  itemId: number;
  productId: number;
  sku: string;
  qty: number;
  name: string;
  image: string;
  price: number;
  total: number;
  sync: boolean;
  weight: number;
}

export interface IResponseItemBiddingCart {
  cartId: string;
  itemId: number;
  productId: number;
  sku: string;
  qty: number;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  discount: number;
  total: number;
  sync: boolean;
  weight: number;
  expiredTime: number;
}
