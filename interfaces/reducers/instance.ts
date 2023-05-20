import { IAuthReponseSignIn } from 'interfaces/response/auth/user';
import {
  IRequestSearchProduct,
  ProductItem,
} from 'interfaces/response/products';
import { LastedBidding } from 'interfaces/types/lastedBidding';
import { IResponseFetchDesign } from 'interfaces/types/response';
import {
  UserEntity,
  AddressEntity,
  SystemStatusData,
  NotificationEntity,
  OrderHistoryEntity,
  BidHistoryEntity,
  ProductFavoriteHistoryEntity,
} from 'interfaces/types/user';
import {
  WalletHistoryEntity,
  BankAccountEntity,
  ResponseListBankTopup,
  VoucherXuEntity,
} from 'interfaces/response/wallet';
import { OrderEntity } from 'interfaces/response/order';
import { IProduct } from 'interfaces/response/home';
import {
  IResponseStoreBiddingCart,
  IResponseStoreCart,
} from 'interfaces/response/cart';
import {
  BaseResponse,
  BaseResponsePagination,
} from 'interfaces/response/common';
import {
  AffiliateTransactionEntity,
  MyAffiliateInfo,
  PackageAffiliateEntity,
} from 'interfaces/response/affiliate';

export type ShareInstanceState = {
  isLogged: boolean;
  isBusy: boolean;
};
export type RootInstancePageState = {
  data: IResponseFetchDesign;
  auth?: IAuthReponseSignIn;
  prevPath: string;
};

export type HomeInstancePageState = {
  categories: any;
  suggest: any;
  listBidding: LastedBidding[];
  // listProcess: IProduct[];
  listInProcess: IProduct[];
  listInDeposit: IProduct[];
};

export type CartInstancePageState = {
  isAddCart: boolean; /// SHOULD REMOVE
  products: ProductItem[]; /// SHOULD REMOVE
  data: Array<IResponseStoreCart>;
  dataBidding: IResponseStoreBiddingCart[];
};

export type SearchInstancePageState = {
  query: IRequestSearchProduct;
  responseSearch: BaseResponsePagination<Array<ProductItem>>;
};

type UserKey =
  | 'getAddress'
  | 'createAddress'
  | 'deleteAddress'
  | 'updateAddress'
  | 'getUserProfile'
  | 'updateUserProfile'
  | 'updateUserAvatar'
  | 'systemStatus'
  | 'logOut'
  | 'getNotification'
  | 'getHistory'
  | 'getWishList';

export type UserInstancePageState = {
  profile?: UserEntity;
  auth?: IAuthReponseSignIn;
  shippingAddress: AddressEntity[];
  systemStatus: SystemStatusData;
  stateLoginPopup: boolean;
  notifications: {
    data: NotificationEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  orderHistories: {
    data: OrderHistoryEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  commentHistories: {
    data: OrderHistoryEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  bidHistories: {
    data: BidHistoryEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  productFavoriteHistories: {
    data: ProductFavoriteHistoryEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  wishList: {
    data: any[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  isLoadings: {
    [k in UserKey]: boolean;
  };
  isErrors: {
    [k in UserKey]: string | null;
  };
};

type nameWalletAction =
  | 'getHistory'
  | 'getBankAccounts'
  | 'getListBankTopup'
  | 'vouchers'
  | 'claimVoucher';

export interface WalletInitialState {
  history: {
    data: WalletHistoryEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  bankAccounts: BankAccountEntity[];
  listBankTopup: ResponseListBankTopup[];
  vouchers: {
    data: VoucherXuEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  isLoadings: { [k in nameWalletAction]: boolean };
  isErrors: { [k in nameWalletAction]: string | null };
}

type nameOrderAction = 'getHistory';

export interface OrderInitialState {
  history: {
    data: OrderEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  isLoadings: { [k in nameOrderAction]: boolean };
  isErrors: { [k in nameOrderAction]: string | null };
}

type nameAffiliateAction =
  | 'getTransaction'
  | 'getPackages'
  | 'getMyAffiliate'
  | 'updatePresentCode';
export interface AffiliateInitialState {
  transactions: {
    data: AffiliateTransactionEntity[];
    totalRecord: number;
    totalPaging: number;
    pageSize: number;
    pageIndex: number;
  };
  packages: PackageAffiliateEntity[];
  myAffiliateInfo: MyAffiliateInfo;
  isLoadings: { [k in nameAffiliateAction]: boolean };
  isErrors: { [k in nameAffiliateAction]: string | null };
}
