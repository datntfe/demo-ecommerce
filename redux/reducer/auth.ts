import update from 'react-addons-update';

import { RootInstancePageState } from 'interfaces/reducers/instance';

import { RootPageActionEnum } from '../action/authth';

const initialState: RootInstancePageState = {
  data: {},
  auth: undefined,
  prevPath: '',
};

export function RootPageReducer(state = initialState, action: any): RootInstancePageState {
  const { type, payload } = action;

  switch (type) {
    case RootPageActionEnum.SET_AUTH: {
      return update(state, {
        auth: { $set: payload },
      });
    }
    case RootPageActionEnum.INIT_DATA:
      if (payload.data.query.keywordsFull) {
        payload.data.query.keywords = payload.data.query.keywordsFull; // Fix bug not display keywords cause backend return FULLKEYWORD
      }

      return update(state, {
        data: { $set: payload.data },
        isShowCollection: { $set: false },
      });

    case RootPageActionEnum.STORE_PREV_PATH: {
      return update(state, {
        prevPath: { $set: payload },
      });
    }

    default:
      return state;
  }
}
