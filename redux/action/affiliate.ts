import { reduxRequestActionGenerator } from 'utils/actionGeneration';
import { OrderEntity } from 'interfaces/response/order';
import { Dispatch } from 'redux';
import { AffiliateTransactionEntity } from 'interfaces/response/affiliate';
import { PaginationParam } from 'interfaces/response/common';
import {
  getAffiliateTransactionService,
  getMyAffiliateInfoService,
  getPackagesAffiliateService,
  updatePresentAffiliateCodeService,
} from 'services/affiliate';

const scope = 'affiliate';

export const GET_TRANSACTION_HISTORY = reduxRequestActionGenerator(
  scope,
  'GET_TRANSACTION_HISTORY',
);

export const getAffiliateTransactions =
  (data: PaginationParam, loadMore?: boolean) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: GET_TRANSACTION_HISTORY.pending });
      const res = await getAffiliateTransactionService(data);
      if (res.data.status) {
        dispatch({
          type: GET_TRANSACTION_HISTORY.success,
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
      dispatch({ type: GET_TRANSACTION_HISTORY.error, message: error });
    }
  };

export const GET_MY_AFFILIATE_INFO = reduxRequestActionGenerator(
  scope,
  'GET_MY_AFFILIATE_INFO',
);

export const getMyAffiliateInfo = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: GET_MY_AFFILIATE_INFO.pending });
    const res = await getMyAffiliateInfoService();
    if (res.data.status) {
      dispatch({
        type: GET_MY_AFFILIATE_INFO.success,
        payload: res.data.data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_MY_AFFILIATE_INFO.error, message: error });
  }
};

export const GET_AFFILIATE_PACKAGES = reduxRequestActionGenerator(
  scope,
  'GET_AFFILIATE_PACKAGES',
);

export const getAffiliatePackages = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: GET_AFFILIATE_PACKAGES.pending });
    const res = await getPackagesAffiliateService();
    if (res.data.status) {
      dispatch({
        type: GET_AFFILIATE_PACKAGES.success,
        payload: res.data.data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_AFFILIATE_PACKAGES.error, message: error });
  }
};

export const UPDATE_PRESENT_CODE = reduxRequestActionGenerator(
  scope,
  'UPDATE_PRESENT_CODE',
);

export const updatePresentCode =
  (presenterCode: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: UPDATE_PRESENT_CODE.pending });
      const res = await updatePresentAffiliateCodeService({ presenterCode });
      if (res.data.status) {
        dispatch({
          type: UPDATE_PRESENT_CODE.success,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: UPDATE_PRESENT_CODE.error, message: error });
    }
  };
