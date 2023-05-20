import { IResponseItemCart, IResponseStoreCart, IResponseItemBiddingCart } from 'interfaces/response/cart';
import { ProductItem } from 'interfaces/response/products';
import { ActionMap } from 'redux/reducer/action';
import { getCartItems } from 'services/cart';

export enum CartActionEnum {
  IS_ADD_TO_CART = 'IS_ADD_TO_CART',
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  SET_CART_DATA_REPONSE = 'SET_CART_DATA_REPONSE',
  SET_CART_DATA_BIDDING_REPONSE = 'SET_CART_DATA_BIDDING_REPONSE',
}

export const isAddToCart = (payload: boolean) => (dispatch: any) => {
  dispatch({
    type: CartActionEnum.IS_ADD_TO_CART,
    payload,
  });
};

export const setCartItems = (payload: ProductItem[]) => (dispatch: any) => {
  dispatch({
    type: CartActionEnum.SET_CART_ITEMS,
    payload,
  });
};

export const getListDataCart = () => (dispatch: any) => {
  // dispatch({ type: 'getListDataCart' });
  // getCartItems().then((response) => {
  //   console.log('____Call in action', response);
  //   const { data } = response;
  //   dispatch({
  //     type: CartActionEnum.SET_CART_DATA_REPONSE,
  //     payload: data.data,
  //   });
  // });
};

export const setReponseDataCart = (payload: Array<IResponseStoreCart>) => (dispatch: any) => {
  dispatch({
    type: CartActionEnum.SET_CART_DATA_REPONSE,
    payload,
  });
};

export const setReponseDataBiddingCart = (payload: Array<IResponseItemBiddingCart>) => (dispatch: any) => {
  dispatch({
    type: CartActionEnum.SET_CART_DATA_BIDDING_REPONSE,
    payload,
  });
};

export const addItemToCart = (payload: ProductItem) => (dispatch: any) => {
  dispatch({
    type: CartActionEnum.ADD_ITEM_TO_CART,
    payload,
  });
};

export type CartPayload = {
  [CartActionEnum.IS_ADD_TO_CART]: boolean;
  [CartActionEnum.SET_CART_ITEMS]: ProductItem[];
  [CartActionEnum.ADD_ITEM_TO_CART]: ProductItem;
  [CartActionEnum.SET_CART_DATA_REPONSE]: IResponseItemCart;
  [CartActionEnum.SET_CART_DATA_BIDDING_REPONSE]: IResponseItemBiddingCart;
};
export type CartDataAction = ActionMap<CartPayload>[keyof ActionMap<CartPayload>];
