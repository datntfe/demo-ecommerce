export interface ProvinceEntity {
  districts?: string;
  id: string;
  level: string;
  name: string;
}

export interface DistrictEntity {
  id: string;
  name: string;
  level: string;
  provinceId: string;
  province?: string;
  wards?: string;
}

export interface WardEntity {
  id: string;
  name: string;
  level: string;
  districtId: string;
  district: {
    id: string;
    name: string;
    level: string;
    provinceId: string;
    province: {
      id: string;
      name: string;
      level: string;
      districts: [string];
    };
    wards: [string];
  };
}

export interface UserEntity {
  userId: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  point: number;
  gender: number;
  birthDay: string;
  facebookKey: string;
  googleKey: string;
  walletCode: string;
}

export interface AddressEntity {
  id: string;
  name: string;
  phone: string;
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  wardId: string;
  wardName: string;
  address: string;
  type: number;
  isDefault: boolean;
}

export interface CreateShippingAddressData {
  name: string;
  phone: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  type: number;
  isDefault: boolean;
}

export interface UpdateProfileParams {
  name: string;
  birthDay: string;
  gender: number;
  email?: string;
}

export interface SystemStatusData {
  unreadNotificaitionCount: number;
  productInCart: number;
  viewStatus: number;
  productInBidding: number;
  productInDeposit: number;
  unreadNotifOrder: number;
  unreadNotifCoupon: number;
  unreadNotifWallet: number;
}

export interface LoginSocialData {
  refresh_token: string;
  token: string;
  userInfo: UserEntity;
  expires_in: number;
  type: number;
}

export interface NotificationEntity {
  id: string;
  type: number;
  title: string;
  summary: string;
  description: string;
  createAt: string;
  image: string;
  childCode: string;
  status: number;
  isViewed: boolean;
  items: NotificationEntity[];
}

export enum OrderHistoryType {
  BASE = 1,
  HIDE = 2,
  NORMAL = 3,
}

export interface OrderHistoryEntity {
  orderId: string;
  orderCode: string;
  productId: string;
  type: OrderHistoryType;
  image: string;
  name: string;
  price: number;
  createdDate: string;
}

export interface BidHistoryEntity {
  orderId: string;
  orderCode: string;
  type: OrderHistoryType;
  image: string;
  name: string;
  price: number;
  createdDate: string;
}

export interface ProductFavoriteHistoryEntity {
  orderId: string;
  orderCode: string;
  type: OrderHistoryType;
  image: string;
  name: string;
  price: number;
  createdDate: string;
}
