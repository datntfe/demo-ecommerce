/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import update from 'react-addons-update';
import { SearchInstancePageState } from 'interfaces/reducers/instance';
import { SearchActionEnum, SearchPageDataAction, SearchPagePayload } from 'redux/action/search';

const initialState: SearchInstancePageState = {
  query: {},
  responseSearch: {} as any,
};
export function SearchReducer(state = initialState, action: SearchPageDataAction): SearchInstancePageState {
  const { type, payload } = action;

  switch (type) {
    case SearchActionEnum.SET_INIT_SEARCH_DATA:
      return update(state, {
        query: { $set: payload.query },
        responseSearch: { $set: payload.response },
      });

    case SearchActionEnum.CLEAR_QUERY: {
      return { ...state, query: { keyword: action.payload ? '' : state.query.keyword } };
    }

    default:
      return state;
  }
}
