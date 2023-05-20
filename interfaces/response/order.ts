import { AddressEntity } from 'interfaces/types/user';

export enum EStatusOrder {
  Cart = 0,
  Confirmed = 1,
  Paid = 2,
  Canceled = 3,
  Shipped = 4,
}

export interface Attribute {
  attribute_name: string;
  attribute_code: string;
}
export interface OrderEntity {
  orderId: number;
  storeId: number;
  storeName: string;
  storeImage: string;
  isStoreCredential: number;
  code: string;
  payment_method: string;
  shippingDateFrom: string;
  shippingDateTo: string;
  reviews: any;
  shippingFee: number;
  shippingType: number;
  sku: string;
  qty: number;
  name: string;
  image: string;
  unitPrice: number;
  price: number;
  total: number;
  status: number;
  statusPayment: number;
  address: AddressEntity;
  followStatus: any;
  products: Product[];
}

export interface IResquestCreateOrder {
  userAddressId: string;
  shippingMethod: number;
  deliveryTimeId: number;
  paymentMethod: number;
  couponCode?: string;
  paymentVia?: string;
  paymentDestinationId?: string;
  redirectUrl?: string;
}

export interface IShippingPrice {
  receiver_province: string;
  receiver_district: string;
  weight: number;
  value: number;
}

export interface CalculatorShipPriceResponse {
  name: string;
  service: {
    name: string;
    service: string;
    pickup: string;
    delivery: string;
    fee: number;
    ship?: string;
  }[];
}

export interface CalculatorShipPriceDefault {
  name: string;
  service: string;
  pickup: string;
  delivery: string;
  fee: number;
  ship?: string;
}

export interface Product {
  productId: number;
  sku: string;
  qty: number;
  name: string;
  image: string;
  unitPrice: number;
  price: number;
  total: number;
  attributes: string;
}
export interface OrderEntityExpand extends OrderEntity {
  code: string;
  storeName: string;
  createdDate: string;
  payment_method: string;
  shippingDateFrom: string;
  shippingDateTo: string;
  coinReview: number;
  shippingFee: number;
  shippingType: number;
  address: AddressEntity;
  followStatus: any[];
  followId: string;
  descriptions: string;
  orderCode: string;
  shippingId: number;
  shippingName: string;
  products: Product[];
  reviews: any;
}
export interface IResquestCancelOrder {
  id: number;
  reason: string;
}
export interface Files {
  files: string;
  type: number;
}
export interface IResquestReviewOrder {
  orderId: string;
  productId: string;
  files: { files: string; type: number }[];
  content: string;
  star: number;
}
export interface IResquestFilesImportReviewOrder {
  slug: string;
  files: string[];
}
