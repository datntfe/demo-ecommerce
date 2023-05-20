import { IProduct, IResponseBiddingProcess } from 'interfaces/response/home';
import { ActionMap } from 'redux/reducer/action';

export enum HomeActionEnum {
  FETCH_ALL_CATEGORY = 'FETCH_ALL_CATEGORY',
  FETCH_SUGGEST_KEYWORDs = 'FETCH_SUGGEST_KEYWORDs',
  SET_DATA_BIDDING_ITEMS = 'SET_DATA_BIDDING_ITEMS',
  SET_DATA_BIDDING_PROCESS = 'SET_DATA_BIDDING_PROCESS',
}

export const fetchAllCategories = (payload: any) => (dispatch: any) => {
  dispatch({
    type: HomeActionEnum.FETCH_ALL_CATEGORY,
    payload,
  });
};

export const fetchSuggestKeywords = (payload: Array<string>) => (dispatch: any) => {
  dispatch({
    type: HomeActionEnum.FETCH_SUGGEST_KEYWORDs,
    payload,
  });
};

export const setDataBiddingItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: HomeActionEnum.SET_DATA_BIDDING_ITEMS,
    payload,
  });
};

export const setBiddingProcess = (payload: IResponseBiddingProcess) => (dispatch: any) => {
  dispatch({
    type: HomeActionEnum.SET_DATA_BIDDING_PROCESS,
    payload,
  });
};

export type HomePayload = {
  [HomeActionEnum.FETCH_ALL_CATEGORY]: object;
  [HomeActionEnum.FETCH_SUGGEST_KEYWORDs]: Array<string>;
  [HomeActionEnum.SET_DATA_BIDDING_ITEMS]: Array<any>;
  [HomeActionEnum.SET_DATA_BIDDING_PROCESS]: IResponseBiddingProcess;
};
export type HomeDataAction = ActionMap<HomePayload>[keyof ActionMap<HomePayload>];
