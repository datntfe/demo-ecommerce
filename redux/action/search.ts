import { IPayloadSearchPage } from 'interfaces/reducers/payload';
import { ActionMap } from 'redux/reducer/action';

export enum SearchActionEnum {
  SET_INIT_SEARCH_DATA = 'SET_INIT_SEARCH_DATA',
  CLEAR_QUERY = 'CLEAR_QUERY',
}

export const setInitSearchData = (payload: any) => (dispatch: any) => {
  dispatch({
    type: SearchActionEnum.SET_INIT_SEARCH_DATA,
    payload,
  });
};

export const clearQuery = (isClearAll: boolean) => (dispatch: any) => {
  dispatch({
    type: SearchActionEnum.CLEAR_QUERY,
    payload: isClearAll,
  });
};

export type SearchPagePayload = {
  [SearchActionEnum.SET_INIT_SEARCH_DATA]: IPayloadSearchPage;
  [SearchActionEnum.CLEAR_QUERY]: IPayloadSearchPage;
};
export type SearchPageDataAction = ActionMap<SearchPagePayload>[keyof ActionMap<SearchPagePayload>];
