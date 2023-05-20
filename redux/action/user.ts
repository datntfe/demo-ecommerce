import { reduxRequestActionGenerator } from 'utils/actionGeneration';
import {
  AddressEntity,
  CreateShippingAddressData,
  UserEntity,
  UpdateProfileParams,
} from 'interfaces/types/user';
import { Dispatch } from 'redux';
import {
  getShippingAddressServices,
  createShippingAddressServices,
  deleteShippingAddressServices,
  updateShippingAddressServices,
  getUserProfileServices,
  updateUserProfileServices,
  updateAvatarUser,
  getSystemStatusServices,
  logOutServices,
  NotificationParam,
  getNotificationServices,
  getOrderHistoryServices,
  markReadNotificationServices,
  getBidHistoryServices,
  getProductFavoriteHistoryServices,
  BidHistoryParams,
  PaginationParamHistoryOrder,
} from 'services/user';
import toast from 'react-hot-toast';
import { PaginationParam } from 'interfaces/response/common';
import { getWishListsServices } from 'services/products';
import request from 'utils/request';
import { AxiosRequestConfig } from 'axios';

const scope = 'user';
export const GET_SHIPPING_ADDRESS = reduxRequestActionGenerator(
  scope,
  'GET_SHIPPING_ADDRESS',
);

export const getShippingAddress =
  () => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_SHIPPING_ADDRESS.pending });
      const res = await getShippingAddressServices();
      if (res.data.status) {
        dispatch({
          type: GET_SHIPPING_ADDRESS.success,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: GET_SHIPPING_ADDRESS.error, message: error });
    }
  };
export interface GetShippingAddressAction {
  type: typeof GET_SHIPPING_ADDRESS.pending;
}

export interface GetShippingAddressSuccessAction {
  type: typeof GET_SHIPPING_ADDRESS.success;
  payload: AddressEntity[];
}
export interface GetShippingAddressFailedAction {
  type: typeof GET_SHIPPING_ADDRESS.error;
  message: string;
}
export const CREATE_SHIPPING_ADDRESS = reduxRequestActionGenerator(
  scope,
  'CREATE_SHIPPING_ADDRESS',
);

export const createShippingAddress =
  (paramsData: CreateShippingAddressData) =>
  async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: CREATE_SHIPPING_ADDRESS.pending });
      const res = await createShippingAddressServices(paramsData);
      if (res.data.status) {
        dispatch({
          type: CREATE_SHIPPING_ADDRESS.success,
          payload: res.data.data,
        });
        toast.success('đã tạo địa chỉ mới');
      }
    } catch (error) {
      dispatch({ type: CREATE_SHIPPING_ADDRESS.error, message: error });
    }
  };
export interface CreateShippingAddressAction {
  type: typeof CREATE_SHIPPING_ADDRESS.pending;
}

export interface CreateShippingAddressSuccessAction {
  type: typeof CREATE_SHIPPING_ADDRESS.success;
  payload: AddressEntity;
}
export interface CreateShippingAddressFailedAction {
  type: typeof CREATE_SHIPPING_ADDRESS.error;
  message: string;
}

export const DELETE_SHIPPING_ADDRESS = reduxRequestActionGenerator(
  scope,
  'DELETE_SHIPPING_ADDRESS',
);

export const deleteShippingAddress =
  (paramsData: string) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: DELETE_SHIPPING_ADDRESS.pending });
      const res = await deleteShippingAddressServices(paramsData);
      if (res.data.status) {
        dispatch({
          type: DELETE_SHIPPING_ADDRESS.success,
          payload: paramsData,
        });
        toast.success('đã xóa địa chỉ');
      }
    } catch (error) {
      dispatch({ type: DELETE_SHIPPING_ADDRESS.error, message: error });
    }
  };
export interface DeleteShippingAddressAction {
  type: typeof DELETE_SHIPPING_ADDRESS.pending;
}

export interface DeleteShippingAddressSuccessAction {
  type: typeof DELETE_SHIPPING_ADDRESS.success;
  payload: string;
}
export interface DeleteShippingAddressFailedAction {
  type: typeof DELETE_SHIPPING_ADDRESS.error;
  message: string;
}

export const UPDATE_SHIPPING_ADDRESS = reduxRequestActionGenerator(
  scope,
  'UPDATE_SHIPPING_ADDRESS',
);

export const updateShippingAddress =
  (id: string, paramsData: CreateShippingAddressData) =>
  async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UPDATE_SHIPPING_ADDRESS.pending });
      const res = await updateShippingAddressServices(id, paramsData);
      if (res.data.status) {
        dispatch({
          type: UPDATE_SHIPPING_ADDRESS.success,
          payload: res.data.data,
        });
        toast.success('đã cập nhật địa chỉ');
      }
    } catch (error) {
      dispatch({ type: UPDATE_SHIPPING_ADDRESS.error, message: error });
    }
  };

export interface UpdateShippingAddressAction {
  type: typeof UPDATE_SHIPPING_ADDRESS.pending;
}

export interface UpdateShippingAddressSuccessAction {
  type: typeof UPDATE_SHIPPING_ADDRESS.success;
  payload: AddressEntity;
}
export interface UpdateShippingAddressFailedAction {
  type: typeof UPDATE_SHIPPING_ADDRESS.error;
  message: string;
}

export const GET_USER_PROFILE = reduxRequestActionGenerator(
  scope,
  'GET_USER_PROFILE',
);

export const getUserProfile =
  () => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_USER_PROFILE.pending });
      const res = await getUserProfileServices();
      if (res.data.status) {
        dispatch({ type: GET_USER_PROFILE.success, payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: GET_USER_PROFILE.error, message: error });
    }
  };

export interface GetUserProfileAction {
  type: typeof GET_USER_PROFILE.pending;
}

export interface GetUserProfileSuccessAction {
  type: typeof GET_USER_PROFILE.success;
  payload: UserEntity;
}
export interface GetUserProfileFailedAction {
  type: typeof GET_USER_PROFILE.error;
  message: string;
}

export const UPDATE_USER_PROFILE = reduxRequestActionGenerator(
  scope,
  'UPDATE_USER_PROFILE',
);

export const upDateUserProfile =
  (data: UpdateProfileParams) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UPDATE_USER_PROFILE.pending });
      const res = await updateUserProfileServices(data);
      if (res.data.status) {
        dispatch({ type: UPDATE_USER_PROFILE.success, payload: res.data.data });
        toast.success('Đã thay đổi thông tin thành công');
      } else {
        toast.error(res.data.message);
        dispatch({
          type: UPDATE_USER_PROFILE.error,
          message: res.data.message,
        });
      }
    } catch (error) {
      dispatch({ type: UPDATE_USER_PROFILE.error, message: error });
    }
  };

export interface UpdateUserProfileAction {
  type: typeof UPDATE_USER_PROFILE.pending;
}

export interface UpdateUserProfileSuccessAction {
  type: typeof UPDATE_USER_PROFILE.success;
  payload: UserEntity;
}
export interface UpdateUserProfileFailedAction {
  type: typeof UPDATE_USER_PROFILE.error;
  message: string;
}

export const UPDATE_USER_AVATAR = reduxRequestActionGenerator(
  scope,
  'UPDATE_USER_AVATAR',
);

export const upDateUserAvatar =
  (data: FormData) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: UPDATE_USER_AVATAR.pending });
      const res = await updateAvatarUser(data);
      if (res.data.status) {
        dispatch({
          type: UPDATE_USER_AVATAR.success,
          payload: res.data.data.avatar,
        });
      } else {
        toast.error(res.data.message);
        dispatch({ type: UPDATE_USER_AVATAR.error, message: res.data.message });
      }
    } catch (error) {
      dispatch({ type: UPDATE_USER_AVATAR.error, message: error });
      toast.error('đã có lổi xảy ra');
    }
  };

export interface UpdateUserAvatarAction {
  type: typeof UPDATE_USER_AVATAR.pending;
}

export interface UpdateUserAvatarSuccessAction {
  type: typeof UPDATE_USER_AVATAR.success;
  payload: UserEntity;
}
export interface UpdateUserAvatarFailedAction {
  type: typeof UPDATE_USER_AVATAR.error;
  message: string;
}

export const GET_SYSTEM_STATUS = reduxRequestActionGenerator(
  scope,
  'GET_SYSTEM_STATUS',
);

export const getSystemStatus =
  () => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_SYSTEM_STATUS.pending });
      const res = await getSystemStatusServices();
      if (res.data.status) {
        dispatch({ type: GET_SYSTEM_STATUS.success, payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: GET_SYSTEM_STATUS.error, message: error });
    }
  };
export interface GetSystemStatusAction {
  type: typeof GET_SYSTEM_STATUS.pending;
}

export interface GetSystemStatusSuccessAction {
  type: typeof GET_SYSTEM_STATUS.success;
  payload: UserEntity;
}
export interface GetSystemStatusFailedAction {
  type: typeof GET_SYSTEM_STATUS.error;
  message: string;
}

export const LOG_OUT = reduxRequestActionGenerator(scope, 'LOG_OUT');

export const logOut = () => async (dispatch: Dispatch<UserDataAction>) => {
  try {
    const token = localStorage.getItem('_u') ?? '';
    await logOutServices({ token });
    delete request.defaults.headers.common.Authorization;
    localStorage.removeItem('_u');
    localStorage.removeItem('_uRefresh');
    dispatch({ type: LOG_OUT.pending });
  } catch (error) {
    delete request.defaults.headers.common.Authorization;
    dispatch({ type: LOG_OUT.pending });
    localStorage.removeItem('_u');
    localStorage.removeItem('_uRefresh');
  }
};

export interface LogOutAction {
  type: typeof LOG_OUT.pending;
}

export interface LogOutSuccessAction {
  type: typeof LOG_OUT.success;
  payload: UserEntity;
}
export interface LogOutFailedAction {
  type: typeof LOG_OUT.error;
  message: string;
}

export const GET_NOTIFICATION = reduxRequestActionGenerator(
  scope,
  'GET_NOTIFICATION',
);

export const getNotifications =
  (data: NotificationParam) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_NOTIFICATION.pending });
      const res = await getNotificationServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_NOTIFICATION.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_NOTIFICATION.error, message: error });
    }
  };

export const MARK_READ_NOTIFICATION = reduxRequestActionGenerator(
  scope,
  'MARK_READ_NOTIFICATION',
);

export const markReadNotification =
  () => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: MARK_READ_NOTIFICATION.pending });
      const res = await markReadNotificationServices();
      if (res.data.status) {
        dispatch({
          type: MARK_READ_NOTIFICATION.success,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: MARK_READ_NOTIFICATION.error, message: error });
    }
  };

export const GET_ORDER_HISTORY_HISTORY = reduxRequestActionGenerator(
  scope,
  'GET_ORDER_HISTORY_HISTORY',
);

export const getOrderHistories =
  (data: PaginationParam) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_ORDER_HISTORY_HISTORY.pending });
      const res = await getOrderHistoryServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_ORDER_HISTORY_HISTORY.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_ORDER_HISTORY_HISTORY.error, message: error });
    }
  };

export const GET_BID_HISTORY = reduxRequestActionGenerator(
  scope,
  'GET_BID_HISTORY',
);

export const getBidHistories =
  (data: BidHistoryParams) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_BID_HISTORY.pending });
      const res = await getBidHistoryServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_BID_HISTORY.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_BID_HISTORY.error, message: error });
    }
  };

export const GET_PRODUCT_FAVORITE_HISTORY = reduxRequestActionGenerator(
  scope,
  'GET_PRODUCT_FAVORITE_HISTORY',
);

export const getProductFavoriteHistory =
  (data: PaginationParam) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_PRODUCT_FAVORITE_HISTORY.pending });
      const res = await getProductFavoriteHistoryServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_PRODUCT_FAVORITE_HISTORY.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_PRODUCT_FAVORITE_HISTORY.error, message: error });
    }
  };

export const GET_WISH_LIST = reduxRequestActionGenerator(
  scope,
  'GET_WISH_LIST',
);

export const getWishLists =
  (data: PaginationParam) => async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_WISH_LIST.pending });
      const res = await getWishListsServices(data);
      if (res.data.status) {
        dispatch({
          type: GET_WISH_LIST.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_WISH_LIST.error, message: error });
    }
  };

export const SET_STATE_LOGIN_POPUP = 'SET_STATE_LOGIN_POPUP';

export const setStateLoginPopup =
  (state: boolean) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: SET_STATE_LOGIN_POPUP, payload: state });
  };

export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';

export const commentSuccess =
  (orderCode: string) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: COMMENT_SUCCESS, payload: orderCode });
  };

export const REMOVE_ITEM_CART_BUY_NOW = 'REMOVE_ITEM_CART_BUY_NOW';

export const removeItemCartBuyNow = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: REMOVE_ITEM_CART_BUY_NOW });
};

export const GET_COMMENT_HISTORY = reduxRequestActionGenerator(
  scope,
  'GET_COMMENT_HISTORY',
);

export const getCommentHistories =
  (data: PaginationParamHistoryOrder) =>
  async (dispatch: Dispatch<UserDataAction>) => {
    try {
      dispatch({ type: GET_COMMENT_HISTORY.pending });
      const res = await getOrderHistoryServices(data);
      console.log(res);
      if (res.data.status) {
        dispatch({
          type: GET_COMMENT_HISTORY.success,
          payload: {
            data: res.data.data,
            totalRecord: res.data.totalRecord,
            totalPaging: res.data.totalPaging,
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
          },
        });
      }
    } catch (error) {
      dispatch({ type: GET_COMMENT_HISTORY.error, message: error });
    }
  };

export const loadDataLogin =
  (dataParam?: { token: string; refreshToken: string }) =>
  async (dispatch: Dispatch<any>) => {
    if (dataParam) {
      localStorage.setItem('_u', dataParam.token);
      localStorage.setItem('_uRefresh', dataParam.refreshToken);
      request.interceptors.request.use(
        (config: AxiosRequestConfig<string>) => {
          const token = localStorage.getItem('_u');
          if (config && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error: string) => {
          throw error;
        },
      );
    }
    dispatch(getUserProfile());
    // dispatch(getShippingAddress());
    dispatch(getSystemStatus());
    // dispatch(getWishLists({ pageIndex: 1, pageSize: 100 }));
  };

export type UserDataAction =
  | GetShippingAddressAction
  | GetShippingAddressSuccessAction
  | GetShippingAddressFailedAction
  | CreateShippingAddressAction
  | CreateShippingAddressSuccessAction
  | CreateShippingAddressFailedAction
  | DeleteShippingAddressAction
  | DeleteShippingAddressSuccessAction
  | DeleteShippingAddressFailedAction
  | UpdateShippingAddressAction
  | UpdateShippingAddressSuccessAction
  | UpdateShippingAddressFailedAction
  | GetUserProfileAction
  | GetUserProfileSuccessAction
  | GetUserProfileFailedAction
  | GetSystemStatusAction
  | GetSystemStatusSuccessAction
  | GetSystemStatusFailedAction
  | LogOutAction
  | LogOutSuccessAction
  | LogOutFailedAction;
