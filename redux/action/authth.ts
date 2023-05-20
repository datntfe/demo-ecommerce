import { IAuthReponseSignIn, IAuthRequestSignIn } from 'interfaces/response/auth/user';
import { ActionMap, DataObject, GlobalActionEnum } from 'redux/reducer/action';

export enum RootPageActionEnum {
  INIT_DATA = 'INIT_DATA',
  SET_AUTH = 'SET_AUTH',
  STORE_PREV_PATH = 'STORE_PREV_PATH',
}

export const setDataRootPageInit = (payload: any) => (dispatch: any) => {
  dispatch({
    type: RootPageActionEnum.INIT_DATA,
    payload,
  });
  dispatch({
    type: GlobalActionEnum.SET_IS_BUSY_PAGE,
    payload: false,
  });
};

export const SetAuthSuccessfull = (payload: IAuthReponseSignIn) => (dispatch: any) => {
  dispatch({
    type: RootPageActionEnum.SET_AUTH,
    payload,
  });
};

export const storePrevPath = (payload: string) => (dispatch: any) => {
  dispatch({
    type: RootPageActionEnum.STORE_PREV_PATH,
    payload,
  });
};

export type RootPagePayload = {
  [RootPageActionEnum.INIT_DATA]: DataObject<object>;
  [RootPageActionEnum.SET_AUTH]: DataObject<IAuthReponseSignIn>;
};
export type DatatableAction = ActionMap<RootPagePayload>[keyof ActionMap<RootPagePayload>];
