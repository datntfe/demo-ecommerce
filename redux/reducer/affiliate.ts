import { AnyAction } from 'redux';
import { findIndex, uniqBy } from 'lodash';
import { AffiliateInitialState } from 'interfaces/reducers/instance';
import { AffiliateTransactionEntity } from 'interfaces/response/affiliate';
import {
  GET_TRANSACTION_HISTORY,
  GET_MY_AFFILIATE_INFO,
  GET_AFFILIATE_PACKAGES,
  UPDATE_PRESENT_CODE,
} from '../action/affiliate';

const sortData = (data: AffiliateTransactionEntity[]) =>
  data.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  });

const initialState: AffiliateInitialState = {
  transactions: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  packages: [],
  myAffiliateInfo: {
    packageId: '0',
    packageName: '',
    packageIcon: '',
    packageLimits: 0,
    packageProfit: 0,
    affCode: 0,
    linkRef: '',
    totalProfit: 0,
    topProfit: 0,
    presenterCode: '',
  },
  isLoadings: {
    getTransaction: false,
    getMyAffiliate: false,
    getPackages: false,
    updatePresentCode: false,
  },
  isErrors: {
    getTransaction: null,
    getMyAffiliate: null,
    getPackages: null,
    updatePresentCode: null,
  },
};

export const AffiliateReducer = (
  state = initialState,
  action: AnyAction,
): AffiliateInitialState => {
  switch (action.type) {
    case GET_TRANSACTION_HISTORY.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getTransaction: null },
        isLoadings: { ...state.isLoadings, getTransaction: true },
      };

    case GET_TRANSACTION_HISTORY.success: {
      const data = !action.payload.loadMore
        ? (action.payload.data as AffiliateTransactionEntity[])
        : [...state.transactions.data, ...action.payload.data];

      return {
        ...state,
        transactions: {
          data: sortData(uniqBy(data, 'orderId')),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getTransaction: false },
      };
    }
    case GET_TRANSACTION_HISTORY.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getTransaction: action.message },
        isLoadings: { ...state.isLoadings, getTransaction: false },
      };
    case GET_MY_AFFILIATE_INFO.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getMyAffiliate: null },
        isLoadings: { ...state.isLoadings, getMyAffiliate: true },
      };

    case GET_MY_AFFILIATE_INFO.success: {
      return {
        ...state,
        myAffiliateInfo: action.payload,
        isLoadings: { ...state.isLoadings, getMyAffiliate: false },
      };
    }
    case GET_MY_AFFILIATE_INFO.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getMyAffiliate: action.message },
        isLoadings: { ...state.isLoadings, getMyAffiliate: false },
      };

    case GET_AFFILIATE_PACKAGES.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getPackages: null },
        isLoadings: { ...state.isLoadings, getPackages: true },
      };

    case GET_AFFILIATE_PACKAGES.success: {
      return {
        ...state,
        packages: action.payload,
        isLoadings: { ...state.isLoadings, getPackages: false },
      };
    }
    case GET_AFFILIATE_PACKAGES.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getPackages: action.message },
        isLoadings: { ...state.isLoadings, getPackages: false },
      };

    case UPDATE_PRESENT_CODE.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, updatePresentCode: null },
        isLoadings: { ...state.isLoadings, updatePresentCode: true },
      };

    case UPDATE_PRESENT_CODE.success: {
      return {
        ...state,
        myAffiliateInfo: {
          ...state.myAffiliateInfo,
          presenterCode: action.payload,
        },
        isLoadings: { ...state.isLoadings, updatePresentCode: false },
      };
    }
    case UPDATE_PRESENT_CODE.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, updatePresentCode: action.message },
        isLoadings: { ...state.isLoadings, updatePresentCode: false },
      };

    default:
      return state;
  }
};
