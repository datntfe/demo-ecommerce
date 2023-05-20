import { reduxRequestActionGenerator } from 'utils/actionGeneration';
import {
  WalletHistoryEntity,
  BankAccountEntity,
} from 'interfaces/response/wallet';
import { Dispatch } from 'redux';
import {
  getWalletHistoryServices,
  WalletHistoryParam,
  getShopdiBankAccountServices,
  getListBankTopupServices,
  getVouchersServices,
  claimVoucherServices,
} from 'services/wallet';
import toast from 'react-hot-toast';
import { PaginationParam } from 'interfaces/response/common';

const scope = 'wallet';

export const GET_WALLET_HISTORY = reduxRequestActionGenerator(
  scope,
  'GET_WALLET_HISTORY',
);

export const getWalletHistory =
  (data: WalletHistoryParam, loadMore?: boolean) =>
  async (dispatch: Dispatch<WalletAction>) => {
    try {
      dispatch({ type: GET_WALLET_HISTORY.pending });
      const res = await getWalletHistoryServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_WALLET_HISTORY.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
            loadMore,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_WALLET_HISTORY.error, message: error });
    }
  };

export interface GetWalletHistoryAction {
  type: typeof GET_WALLET_HISTORY.pending;
}

export interface GetWalletHistorySuccessAction {
  type: typeof GET_WALLET_HISTORY.success;
  payload: {
    data: WalletHistoryEntity[];
    totalRecord: number;
    totalPaging: number;
    pageIndex: number;
    pageSize: number;
  };
}
export interface GetWalletHistoryFailedAction {
  type: typeof GET_WALLET_HISTORY.error;
  message: string;
}

export const GET_BANK_ACCOUNT = reduxRequestActionGenerator(
  scope,
  'GET_BANK_ACCOUNT',
);

export const getShopdiBankAccount =
  () => async (dispatch: Dispatch<WalletAction>) => {
    try {
      dispatch({ type: GET_BANK_ACCOUNT.pending });
      const res = await getShopdiBankAccountServices();
      if (res.data.status) {
        dispatch({
          type: GET_BANK_ACCOUNT.success,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: GET_BANK_ACCOUNT.error, message: error });
    }
  };

export const GET_LIST_BANK_TOPUP = reduxRequestActionGenerator(
  scope,
  'GET_LIST_BANK_TOPUP',
);

export const getListBankTopup =
  () => async (dispatch: Dispatch<WalletAction>) => {
    try {
      dispatch({ type: GET_LIST_BANK_TOPUP.pending });
      const res = await getListBankTopupServices();
      if (res.data.status) {
        dispatch({
          type: GET_LIST_BANK_TOPUP.success,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: GET_LIST_BANK_TOPUP.error, message: error });
    }
  };

export interface GetBankAccountAction {
  type: typeof GET_BANK_ACCOUNT.pending;
}

export interface GetBankAccountSuccessAction {
  type: typeof GET_BANK_ACCOUNT.success;
  payload: BankAccountEntity[];
}
export interface GetBankAccountFailedAction {
  type: typeof GET_BANK_ACCOUNT.error;
  message: string;
}

export const GET_VOUCHERS = reduxRequestActionGenerator(scope, 'GET_VOUCHERS');

export const getVouchers =
  (data?: PaginationParam) => async (dispatch: Dispatch<WalletAction>) => {
    try {
      dispatch({ type: GET_VOUCHERS.pending });
      const res = await getVouchersServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_VOUCHERS.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_VOUCHERS.error, message: error });
    }
  };

export const CLAIM_VOUCHERS = reduxRequestActionGenerator(
  scope,
  'CLAIM_VOUCHERS',
);

export const claimVouchers =
  (code: string, amount: number) =>
  async (dispatch: Dispatch<WalletAction>) => {
    try {
      dispatch({ type: CLAIM_VOUCHERS.pending });
      const res = await claimVoucherServices(code);
      if (res.data.status) {
        dispatch({
          type: CLAIM_VOUCHERS.success,
          payload: { code, amount },
        });
      }
    } catch (error) {
      dispatch({ type: CLAIM_VOUCHERS.error, message: error });
    }
  };

export const TRANSFER_COIN = 'TRANSFER_COIN';

export const transfersCoin =
  (coin: number) => async (dispatch: Dispatch<WalletAction>) => {
    dispatch({ type: TRANSFER_COIN, payload: coin });
  };

export const RECEIVED_COIN = 'RECEIVED_COIN';
export const receivedCoin =
  (coin: number) => async (dispatch: Dispatch<WalletAction>) => {
    dispatch({ type: RECEIVED_COIN, payload: coin });
  };

export const SET_COIN = 'SET_COIN';
export const setCoin =
  (coin: number) => async (dispatch: Dispatch<WalletAction>) => {
    dispatch({ type: SET_COIN, payload: coin });
  };

export type WalletAction =
  | GetWalletHistoryAction
  | GetWalletHistorySuccessAction
  | GetWalletHistoryFailedAction;
