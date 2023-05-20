import { AnyAction } from 'redux';
import { findIndex, uniqBy } from 'lodash';
import { WalletInitialState } from 'interfaces/reducers/instance';
import { WalletHistoryEntity } from 'interfaces/response/wallet';
import {
  GET_WALLET_HISTORY,
  GET_BANK_ACCOUNT,
  GET_LIST_BANK_TOPUP,
  GET_VOUCHERS,
  CLAIM_VOUCHERS,
} from '../action/wallet';

const sortData = (data: WalletHistoryEntity[]) =>
  data.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  });

const initialState: WalletInitialState = {
  history: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  bankAccounts: [],
  listBankTopup: [],
  vouchers: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  isLoadings: {
    getHistory: false,
    getBankAccounts: false,
    getListBankTopup: false,
    vouchers: false,
    claimVoucher: false,
  },
  isErrors: {
    getHistory: null,
    getBankAccounts: null,
    getListBankTopup: null,
    vouchers: null,
    claimVoucher: null,
  },
};

export const walletReducer = (
  state = initialState,
  action: AnyAction,
): WalletInitialState => {
  switch (action.type) {
    case GET_WALLET_HISTORY.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: null },
        isLoadings: { ...state.isLoadings, getHistory: true },
      };

    case GET_WALLET_HISTORY.success: {
      const data = !action.payload.loadMore
        ? (action.payload.data as WalletHistoryEntity[])
        : [...state.history.data, ...action.payload.data];

      return {
        ...state,
        history: {
          data: sortData(uniqBy(data, 'id')),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    }

    case GET_WALLET_HISTORY.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: action.message },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    case GET_BANK_ACCOUNT.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getBankAccounts: null },
        isLoadings: { ...state.isLoadings, getBankAccounts: true },
      };

    case GET_BANK_ACCOUNT.success:
      return {
        ...state,
        bankAccounts: action.payload,
        isLoadings: { ...state.isLoadings, getBankAccounts: false },
      };

    case GET_BANK_ACCOUNT.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getBankAccounts: action.message },
        isLoadings: { ...state.isLoadings, getBankAccounts: false },
      };
    case GET_LIST_BANK_TOPUP.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getListBankTopup: null },
        isLoadings: { ...state.isLoadings, getListBankTopup: true },
      };

    case GET_LIST_BANK_TOPUP.success:
      return {
        ...state,
        listBankTopup: action.payload,
        isLoadings: { ...state.isLoadings, getListBankTopup: false },
      };

    case GET_LIST_BANK_TOPUP.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getListBankTopup: action.message },
        isLoadings: { ...state.isLoadings, getListBankTopup: false },
      };

    case GET_VOUCHERS.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, vouchers: null },
        isLoadings: { ...state.isLoadings, vouchers: true },
      };

    case GET_VOUCHERS.success:
      return {
        ...state,
        vouchers: action.payload,
        isLoadings: { ...state.isLoadings, vouchers: false },
      };

    case GET_VOUCHERS.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, vouchers: action.message },
        isLoadings: { ...state.isLoadings, vouchers: false },
      };
    case CLAIM_VOUCHERS.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, claimVoucher: null },
        isLoadings: { ...state.isLoadings, claimVoucher: true },
      };

    case CLAIM_VOUCHERS.success: {
      const temp = [...state.vouchers.data];
      const index = findIndex(temp, (o) => o.code === action.payload.code);
      temp.splice(index, 1);

      return {
        ...state,
        vouchers: { ...state.vouchers, data: temp },
        isLoadings: { ...state.isLoadings, claimVoucher: false },
      };
    }

    case CLAIM_VOUCHERS.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, claimVoucher: action.message },
        isLoadings: { ...state.isLoadings, claimVoucher: false },
      };

    default:
      return state;
  }
};
