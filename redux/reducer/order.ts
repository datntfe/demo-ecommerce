import { AnyAction } from 'redux';
import { findIndex, uniqBy } from 'lodash';
import { OrderInitialState } from 'interfaces/reducers/instance';
import { OrderEntity } from 'interfaces/response/order';
import { GET_ORDER_HISTORY } from '../action/order';

const sortData = (data: OrderEntity[]) =>
  data.sort((a, b) => {
    if (a.orderId < b.orderId) {
      return 1;
    }
    if (a.orderId > b.orderId) {
      return -1;
    }
    return 0;
  });

const initialState: OrderInitialState = {
  history: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  isLoadings: {
    getHistory: false,
  },
  isErrors: {
    getHistory: null,
  },
};

export const orderReducer = (
  state = initialState,
  action: AnyAction,
): OrderInitialState => {
  switch (action.type) {
    case GET_ORDER_HISTORY.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: null },
        isLoadings: { ...state.isLoadings, getHistory: true },
      };

    case GET_ORDER_HISTORY.success: {
      const data = !action.payload.loadMore
        ? (action.payload.data as OrderEntity[])
        : [...state.history.data, ...action.payload.data];

      return {
        ...state,
        history: {
          data: sortData(uniqBy(data, 'orderId')),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    }

    case GET_ORDER_HISTORY.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: action.message },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };

    default:
      return state;
  }
};
