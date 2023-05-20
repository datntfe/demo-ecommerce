/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import update from 'react-addons-update';
import { CartInstancePageState } from 'interfaces/reducers/instance';
import { ProductItem } from 'interfaces/response/products';
import { findIndex } from 'lodash';
import { CartActionEnum, CartDataAction } from '../action/cart';

const initialState: CartInstancePageState = {
  isAddCart: false,
  products: [],
  data: [],
  dataBidding: [],
};

export function CartReducer(state = initialState, action: CartDataAction): CartInstancePageState {
  const { type, payload } = action;

  switch (type) {
    case CartActionEnum.SET_CART_DATA_REPONSE:
      return update(state, {
        data: { $set: payload },
      });

    case CartActionEnum.SET_CART_DATA_BIDDING_REPONSE:
      return update(state, {
        dataBidding: { $set: payload },
      });

    case CartActionEnum.IS_ADD_TO_CART:
      return update(state, {
        isAddCart: { $set: payload },
      });

    case CartActionEnum.SET_CART_ITEMS:
      return update(state, {
        products: { $set: payload },
      });

    case CartActionEnum.ADD_ITEM_TO_CART:
      const payloadAdd = payload as ProductItem;
      const indexItemAdd = findIndex(state.products, (e) => e.id === payloadAdd.id);

      if (indexItemAdd > -1) {
        return update(state, {
          products: {
            $set: state.products.map((item) => {
              if (item.id === payloadAdd.id) {
                item.quanityInCart += payloadAdd.quanityInCart as any;
              }
              return item;
            }),
          },
        });
      }
      return update(state, {
        products: { $set: [...state.products, payload] },
      });

    default:
      return state;
  }
}
