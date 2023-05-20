export interface WalletHistoryEntity {
  id: string;
  amount: number;
  title: string;
  type: number;
  status: number;
  createAt: string;
  sku?: string;
}

export interface BankAccountEntity {
  bankName: string;
  bankAccount: string;
  bankNumber: string;
}

export enum EnumPaymentMethod {
  BANKS = 3,
  ONLINE = 4,
  MBBANK = 6,
}

export interface TopupData {
  amount: number;
  paymentMethod: EnumPaymentMethod;
  redirectUrl?: string;
  paymentVia?: string;
  paymentDestinationId?: string;
}

export interface TopupResponse {
  code: string;
  paymentUrl: string;
}

export interface NodeWallet {
  id: string;
  externalId: string;
  group: string;
  parentId: string;
  name: string;
  otherName: string;
  image: string;
  sortIndex: number;
  partnerId: string;
}

export interface ResponseListBankTopup {
  node: NodeWallet;
  childrens: {
    node: NodeWallet;
    childrens: [];
  }[];
}

export enum EnumPaymentMethodFE {
  BANKS = 1,
  WALLET = 2,
  ATM = 3,
  VISA = 4,
  COD = 5,
  MBBANK = 6,
}

export interface VoucherXuEntity {
  code: string;
  amount: number;
  expiredDate: string;
  createDate: string;
}
