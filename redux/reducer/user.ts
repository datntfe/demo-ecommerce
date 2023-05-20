import update from 'react-addons-update';
import { UserInstancePageState } from 'interfaces/reducers/instance';
import { AnyAction } from 'redux';
import { findIndex, uniqBy } from 'lodash';
import {
  OrderHistoryEntity,
  NotificationEntity,
  BidHistoryEntity,
  ProductFavoriteHistoryEntity,
  UserEntity,
} from 'interfaces/types/user';
import {
  GET_SHIPPING_ADDRESS,
  CREATE_SHIPPING_ADDRESS,
  DELETE_SHIPPING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_AVATAR,
  GET_SYSTEM_STATUS,
  LOG_OUT,
  GET_NOTIFICATION,
  GET_ORDER_HISTORY_HISTORY,
  GET_BID_HISTORY,
  GET_PRODUCT_FAVORITE_HISTORY,
  MARK_READ_NOTIFICATION,
  GET_WISH_LIST,
  SET_STATE_LOGIN_POPUP,
  COMMENT_SUCCESS,
  REMOVE_ITEM_CART_BUY_NOW,
  GET_COMMENT_HISTORY,
} from 'redux/action/user';
import {
  TRANSFER_COIN,
  CLAIM_VOUCHERS,
  RECEIVED_COIN,
  SET_COIN,
} from 'redux/action/wallet';

const initialState: UserInstancePageState = {
  profile: undefined,
  auth: undefined,
  shippingAddress: [],
  stateLoginPopup: false,
  systemStatus: {
    unreadNotificaitionCount: 0,
    productInCart: 0,
    viewStatus: 0,
    productInBidding: 0,
    productInDeposit: 0,
    unreadNotifOrder: 0,
    unreadNotifCoupon: 0,
    unreadNotifWallet: 0,
  },
  notifications: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  orderHistories: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  commentHistories: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  bidHistories: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  productFavoriteHistories: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  wishList: {
    data: [],
    totalPaging: 0,
    totalRecord: 0,
    pageSize: 0,
    pageIndex: 0,
  },
  isLoadings: {
    getAddress: false,
    createAddress: false,
    deleteAddress: false,
    updateAddress: false,
    getUserProfile: false,
    updateUserProfile: false,
    updateUserAvatar: false,
    systemStatus: false,
    logOut: false,
    getNotification: false,
    getHistory: false,
    getWishList: false,
  },
  isErrors: {
    getAddress: null,
    createAddress: null,
    deleteAddress: null,
    updateAddress: null,
    getUserProfile: null,
    updateUserProfile: null,
    updateUserAvatar: null,
    systemStatus: null,
    logOut: null,
    getNotification: null,
    getHistory: null,
    getWishList: null,
  },
};

const sortData = (data: NotificationEntity[]) =>
  data.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  });

const sortCommentData = (data: OrderHistoryEntity[]) =>
  data.sort((a, b) => {
    if (a.orderId < b.orderId) {
      return 1;
    }
    if (a.orderId > b.orderId) {
      return -1;
    }
    return 0;
  });

export const UserReducer = (
  state = initialState,
  action: AnyAction,
): UserInstancePageState => {
  switch (action.type) {
    case GET_SHIPPING_ADDRESS.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getAddress: null },
        isLoadings: { ...state.isLoadings, getAddress: true },
      };
    case GET_SHIPPING_ADDRESS.success:
      return {
        ...state,
        shippingAddress: action.payload,
        isLoadings: { ...state.isLoadings, getAddress: false },
      };
    case GET_SHIPPING_ADDRESS.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getAddress: action.message },
        isLoadings: { ...state.isLoadings, getAddress: false },
      };
    case CREATE_SHIPPING_ADDRESS.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, createAddress: null },
        isLoadings: { ...state.isLoadings, createAddress: true },
      };
    case CREATE_SHIPPING_ADDRESS.success: {
      const temp = action.payload.isDefault
        ? [...state.shippingAddress].map((item) => ({
            ...item,
            isDefault: false,
          }))
        : [...state.shippingAddress];

      return {
        ...state,
        shippingAddress: [...temp, action.payload],
        isLoadings: { ...state.isLoadings, createAddress: false },
      };
    }

    case CREATE_SHIPPING_ADDRESS.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, createAddress: action.message },
        isLoadings: { ...state.isLoadings, createAddress: false },
      };
    case DELETE_SHIPPING_ADDRESS.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, deleteAddress: null },
        isLoadings: { ...state.isLoadings, deleteAddress: true },
      };
    case DELETE_SHIPPING_ADDRESS.success: {
      const temp = [...state.shippingAddress];
      const index = findIndex(temp, (o) => o.id === action.payload);
      temp.splice(index, 1);
      return {
        ...state,
        shippingAddress: temp,
        isLoadings: { ...state.isLoadings, deleteAddress: false },
      };
    }

    case DELETE_SHIPPING_ADDRESS.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, deleteAddress: action.message },
        isLoadings: { ...state.isLoadings, deleteAddress: false },
      };

    case UPDATE_SHIPPING_ADDRESS.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, deleteAddress: null },
        isLoadings: { ...state.isLoadings, deleteAddress: true },
      };
    case UPDATE_SHIPPING_ADDRESS.success: {
      const temp = action.payload.isDefault
        ? [...state.shippingAddress].map((item) => ({
            ...item,
            isDefault: false,
          }))
        : [...state.shippingAddress];
      const index = findIndex(temp, (o) => o.id === action.payload.id);
      temp[index] = action.payload;
      return {
        ...state,
        shippingAddress: temp,
        isLoadings: { ...state.isLoadings, deleteAddress: false },
      };
    }

    case UPDATE_SHIPPING_ADDRESS.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, deleteAddress: action.message },
        isLoadings: { ...state.isLoadings, deleteAddress: false },
      };

    case GET_USER_PROFILE.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getUserProfile: null },
        isLoadings: { ...state.isLoadings, getUserProfile: true },
      };

    case GET_USER_PROFILE.success:
      return {
        ...state,
        profile: action.payload,
        isLoadings: { ...state.isLoadings, getUserProfile: false },
      };

    case GET_USER_PROFILE.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getUserProfile: action.message },
        isLoadings: { ...state.isLoadings, getUserProfile: false },
      };

    case UPDATE_USER_PROFILE.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, updateUserProfile: null },
        isLoadings: { ...state.isLoadings, updateUserProfile: true },
      };
    case UPDATE_USER_PROFILE.success: {
      return {
        ...state,
        profile: action.payload,
        isLoadings: { ...state.isLoadings, updateUserProfile: false },
      };
    }

    case UPDATE_USER_PROFILE.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, updateUserProfile: action.message },
        isLoadings: { ...state.isLoadings, updateUserProfile: false },
      };

    case UPDATE_USER_AVATAR.pending:
      return {
        ...state,

        isErrors: { ...state.isErrors, updateUserAvatar: null },
        isLoadings: { ...state.isLoadings, updateUserAvatar: true },
      };
    case UPDATE_USER_AVATAR.success: {
      return {
        ...state,
        profile: action.payload,
        isLoadings: { ...state.isLoadings, updateUserAvatar: false },
      };
    }

    case UPDATE_USER_AVATAR.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, updateUserAvatar: action.message },
        isLoadings: { ...state.isLoadings, updateUserAvatar: false },
      };

    case GET_SYSTEM_STATUS.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, systemStatus: null },
        isLoadings: { ...state.isLoadings, systemStatus: true },
      };

    case GET_SYSTEM_STATUS.success:
      return {
        ...state,
        systemStatus: action.payload,
        isLoadings: { ...state.isLoadings, systemStatus: false },
      };

    case GET_SYSTEM_STATUS.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, systemStatus: action.message },
        isLoadings: { ...state.isLoadings, systemStatus: false },
      };
    case LOG_OUT.pending:
      return initialState;
    case GET_NOTIFICATION.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getNotification: null },
        isLoadings: { ...state.isLoadings, getNotification: true },
      };

    case GET_NOTIFICATION.success: {
      const data =
        action.payload.data[0]?.type !== state.notifications.data[0]?.type
          ? (action.payload.data as NotificationEntity[])
          : [...state.notifications.data, ...action.payload.data];
      return {
        ...state,
        notifications: {
          data: sortData(uniqBy(data, 'id')),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getNotification: false },
      };
    }

    case GET_NOTIFICATION.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getNotification: action.message },
        isLoadings: { ...state.isLoadings, getNotification: false },
      };

    case MARK_READ_NOTIFICATION.success:
      return {
        ...state,
        systemStatus: {
          ...state.systemStatus,
          unreadNotificaitionCount: 0,
        },
      };
    case GET_ORDER_HISTORY_HISTORY.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: null },
        isLoadings: { ...state.isLoadings, getHistory: true },
      };
    case GET_ORDER_HISTORY_HISTORY.success: {
      const data =
        action.payload.data[0]?.type !== state.orderHistories.data[0]?.type
          ? (action.payload.data as OrderHistoryEntity[])
          : [...state.orderHistories.data, ...action.payload.data];

      return {
        ...state,
        orderHistories: {
          data: sortCommentData(uniqBy(data, 'orderId')),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    }
    case GET_ORDER_HISTORY_HISTORY.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: action.message },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    case GET_BID_HISTORY.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: null },
        isLoadings: { ...state.isLoadings, getHistory: true },
      };
    case GET_BID_HISTORY.success: {
      const data =
        action.payload.data[0]?.type !== state.notifications.data[0]?.type
          ? (action.payload.data as BidHistoryEntity[])
          : [...state.notifications.data, ...action.payload.data];
      return {
        ...state,
        bidHistories: {
          data: uniqBy(data, 'id'),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    }
    case GET_BID_HISTORY.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: action.message },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    case GET_PRODUCT_FAVORITE_HISTORY.success: {
      const data =
        action.payload.data[0]?.type !== state.notifications.data[0]?.type
          ? (action.payload.data as ProductFavoriteHistoryEntity[])
          : [...state.notifications.data, ...action.payload.data];
      return {
        ...state,
        productFavoriteHistories: {
          data: uniqBy(data, 'id'),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    }
    case GET_PRODUCT_FAVORITE_HISTORY.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: action.message },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };

    case GET_WISH_LIST.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getAddress: null },
        isLoadings: { ...state.isLoadings, getAddress: true },
      };
    case GET_WISH_LIST.success:
      return {
        ...state,
        shippingAddress: action.payload,
        isLoadings: { ...state.isLoadings, getAddress: false },
      };
    case GET_WISH_LIST.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getAddress: action.message },
        isLoadings: { ...state.isLoadings, getAddress: false },
      };
    case SET_STATE_LOGIN_POPUP:
      return {
        ...state,
        stateLoginPopup: action.payload,
      };
    case COMMENT_SUCCESS:
      const temp = [...state.commentHistories.data];
      const index = findIndex(temp, (o) => o.orderId === action.payload);
      temp.splice(index, 1);

      return {
        ...state,
        commentHistories: { ...state.commentHistories, data: temp },
      };
    case REMOVE_ITEM_CART_BUY_NOW:
      return {
        ...state,
        systemStatus: {
          ...state.systemStatus,
          productInCart: state.systemStatus.productInCart - 1,
        },
      };

    case TRANSFER_COIN:
      return {
        ...state,
        profile: {
          ...(state.profile as UserEntity),
          point: (state.profile?.point ?? 0) - action.payload,
        },
      };

    case CLAIM_VOUCHERS:
      return {
        ...state,
        profile: {
          ...(state.profile as UserEntity),
          point: (state.profile?.point ?? 0) + action.payload.amount,
        },
      };
    case RECEIVED_COIN:
      return {
        ...state,
        profile: {
          ...(state.profile as UserEntity),
          point: (state.profile?.point ?? 0) + action.payload,
        },
      };

    case SET_COIN:
      return {
        ...state,
        profile: {
          ...(state.profile as UserEntity),
          point: action.payload,
        },
      };

    case GET_COMMENT_HISTORY.pending:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: null },
        isLoadings: { ...state.isLoadings, getHistory: true },
      };
    case GET_COMMENT_HISTORY.success: {
      const data = [...state.commentHistories.data, ...action.payload.data];
      return {
        ...state,
        commentHistories: {
          data: sortCommentData(uniqBy(data, 'orderId')),
          totalPaging: action.payload.totalPaging,
          totalRecord: action.payload.totalRecord,
          pageSize: action.payload.pageSize,
          pageIndex: action.payload.pageIndex,
        },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };
    }
    case GET_COMMENT_HISTORY.error:
      return {
        ...state,
        isErrors: { ...state.isErrors, getHistory: action.message },
        isLoadings: { ...state.isLoadings, getHistory: false },
      };

    default:
      return state;
  }
};
