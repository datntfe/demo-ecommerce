import update from 'react-addons-update';

import { ShareInstanceState } from 'interfaces/reducers/instance';

import { PayloadDataGlobal, GlobalActionEnum } from './action';

const initialState: ShareInstanceState = {
  isLogged: false,
  isBusy: false,
};

export function GlobalReducer(state = initialState, action: PayloadDataGlobal): ShareInstanceState {
  const { type, payload } = action;

  switch (type) {
    case GlobalActionEnum.SET_IS_BUSY_PAGE:
      return update(state, {
        isBusy: { $set: payload },
      });

    case GlobalActionEnum.LOGIN_URSER:
      return update(state, {
        isLogged: { $set: true },
      });

    case GlobalActionEnum.SET_LOGGED:
      return update(state, {
        isLogged: { $set: true },
      });

    default:
      return state;
  }
}
