import { reduxRequestActionGenerator } from 'utils/actionGeneration';
import { OrderEntity } from 'interfaces/response/order';
import { Dispatch } from 'redux';
import { getOrderHistoryServices, OrderHistoryParam } from 'services/order';
import toast from 'react-hot-toast';

const scope = 'order';

export const GET_ORDER_HISTORY = reduxRequestActionGenerator(
  scope,
  'GET_ORDER_HISTORY',
);

export const getOrderHistory =
  (data: OrderHistoryParam, loadMore?: boolean) =>
  async (dispatch: Dispatch<WalletAction>) => {
    try {
      dispatch({ type: GET_ORDER_HISTORY.pending });
      const res = await getOrderHistoryServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_ORDER_HISTORY.success,
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
      dispatch({ type: GET_ORDER_HISTORY.error, message: error });
    }
  };

export interface GetOrderHistoryAction {
  type: typeof GET_ORDER_HISTORY.pending;
}

export interface GetOrderHistorySuccessAction {
  type: typeof GET_ORDER_HISTORY.success;
  payload: {
    data: OrderEntity[];
    totalRecord: number;
    totalPaging: number;
    pageIndex: number;
    pageSize: number;
  };
}
export interface GetOrderHistoryFailedAction {
  type: typeof GET_ORDER_HISTORY.error;
  message: string;
}

export type WalletAction =
  | GetOrderHistoryAction
  | GetOrderHistorySuccessAction
  | GetOrderHistoryFailedAction;
