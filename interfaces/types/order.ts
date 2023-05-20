export interface IOrderItem {
  hashId: string;
  height: number;
  quanity: number;
  designId?: number;
  title?: string;
  image?: string;
  width?: number;
  size?: string;
  price?: number;
  totalPrice?: number;
  type?: string;
}

export interface IOrderShippingAddress {
  name: string;
  country: string;
  district: string;
  ward: string;
  address: string;
  phone2: string;
  phone: string;
  note?: string;
  email?: string;
}

export interface IOrderCreateItem {
  items: Array<IOrderItem>;
  address: any;
}
export interface IOrderDetailItem {
  designId: number;
  title: string;
  hashId: string;
  height: number;
  quanity: number;
  image: string;
  width: number;
  size?: any;
  price: number;
  totalPrice: number;
  type?: any;
}
export interface IOrderDetail {
  orderId: number;
  hashId: string;
  userName?: any;
  fpString: string;
  items: IOrderDetailItem[];
  shippingAddress: IOrderShippingAddress;
  shipment?: any;
  total: number;
  shippingFee: number;
  price: number;
  status: EStatusOrder;
  createAt: Date;
  lastEdited: Date;
}

export enum EStatusOrder {
  Cart = 0,
  Confirmed = 1,
  Paid = 2,
  Canceled = 3,
  Shipped = 4,
}

export enum ESstatusPurchaseOrder {
  All = 0,
  Pending = 1,
  PendingPickup = 2,
  ShippingProgress = 3,
  Shipped = 4,
  Cancel = 5,
}
