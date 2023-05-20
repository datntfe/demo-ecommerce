/* eslint-disable no-case-declarations */
import update from 'react-addons-update';
import { HomeInstancePageState } from 'interfaces/reducers/instance';
import { IResponseBiddingProcess } from 'interfaces/response/home';
import { HomeActionEnum, HomeDataAction } from '../action/home';

const initialState: HomeInstancePageState = {
  categories: null,
  suggest: [],
  listBidding: [],
  // listProcess: [],
  listInProcess: [],
  listInDeposit: [],
};

export function HomeReducer(state = initialState, action: HomeDataAction): HomeInstancePageState {
  const { type, payload } = action;

  switch (type) {
    case HomeActionEnum.SET_DATA_BIDDING_PROCESS:
      const dataBiddingPayload = payload as IResponseBiddingProcess;
      return update(state, {
        listInProcess: { $set: dataBiddingPayload.inProcess },
        listInDeposit: { $set: dataBiddingPayload.inDeposit },
      });

    case HomeActionEnum.SET_DATA_BIDDING_ITEMS:
      return update(state, {
        listBidding: { $set: payload },
      });

    case HomeActionEnum.FETCH_SUGGEST_KEYWORDs:
      return update(state, {
        suggest: { $set: payload },
      });
    case HomeActionEnum.FETCH_ALL_CATEGORY:
      return update(state, {
        categories: { $set: payload },
      });
    default:
      return state;
  }
}
