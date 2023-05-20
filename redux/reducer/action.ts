import { storeData, actionCreator, actionTryCatchCreator } from 'utils';

export enum GlobalActionEnum {
  SET_IS_BUSY_PAGE = 'SET_IS_BUSY_PAGE',

  TOGGLE_LOADING = 'TOGGLE_LOADING',
  LOGIN_USER_PASSS = 'LOGIN_USER_PASSS',
  LOGOUT_USER = 'LOGOUT_USER',
  UPDATE_USER_INFO = 'UPDATE_USER_INFO',
  TOGGLE_SHOW_SIDEBAR = 'TOGGLE_SHOW_SIDEBAR',
  LOGIN_URSER = 'LOGIN_URSER',
  SET_LOGGED = 'SET_LOGGED',
}

export const setPageIsBusy = (payload: any) => (dispatch: any) => {
  dispatch({
    type: GlobalActionEnum.SET_IS_BUSY_PAGE,
    payload,
  });
};
export const updateUserInfoAction = (payload: any) => (dispatch: any) => {
  dispatch({
    type: GlobalActionEnum.UPDATE_USER_INFO,
    payload,
  });
};

export const logoutUserAction = () => (dispatch: any) => {
  storeData('_u', JSON.stringify({}));
  dispatch({
    type: GlobalActionEnum.LOGOUT_USER,
  });
};

export const actionsLogin = actionCreator({
  actionName: GlobalActionEnum.LOGIN_URSER,
});
export const loginUser = (user: string, pass: string) => (dispatch: any) => {
  const data = {
    email: user,
    password: pass,
  };

  dispatch({ type: GlobalActionEnum.LOGIN_URSER, payload: data });

  return;

  const onPending = () => {
    dispatch({
      type: actionsLogin.PENDING,
    });
  };

  const onSuccess = (data: any) => {
    if (!data) {
      dispatch({
        type: actionsLogin.ERROR,
      });
    } else {
      storeData('_u', JSON.stringify(data));
      dispatch({ type: GlobalActionEnum.LOGIN_URSER, payload: data });
    }
  };
  const onError = (error: any) => {
    dispatch({
      type: actionsLogin.ERROR,
      payload: error,
    });
  };

  actionTryCatchCreator({
    // service: loginWithUserPass(data),
    onPending,
    onSuccess,
    onError,
  });
};

export interface DataObject<T> {
  data: T;
}

export type GlobalDataPayload = {
  [GlobalActionEnum.SET_IS_BUSY_PAGE]: boolean;
  [GlobalActionEnum.LOGIN_URSER]: DataObject<any>;
  [GlobalActionEnum.SET_LOGGED]: DataObject<any>;
};
export type PayloadDataGlobal = ActionMap<GlobalDataPayload>[keyof ActionMap<GlobalDataPayload>];

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
