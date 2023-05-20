export interface LastedBidding {
  productId: number;
  image: string;
  customerId: number;
  customerName: string;
  productName: string;
  purchasedPrice: number;
  createAt: string;
  frameType: EFrameType;
}

export enum EFrameType {
  NORMAL = 0,
  FRAME = 1,
}

export interface User {
  id: string;
  wallet: string;
  price: number;
}
export interface IBiddingStarResponse {
  lockedTime: number;
  discountPrice: number;
  type: number;
  extendTime: number;
  storage: number;
  users?: User[];
  lastedUser?: User;
  id: number;
  minPrice: number;
  minDepositPrice: number;
}
