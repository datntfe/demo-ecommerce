import { combineReducers } from 'redux';
import { RootPageReducer } from 'redux/reducer/auth';
import { HomeReducer } from 'redux/reducer/home';
import { CartReducer } from 'redux/reducer/cart';
import { UserReducer } from 'redux/reducer/user';
import { walletReducer } from 'redux/reducer/wallet';
import { orderReducer } from 'redux/reducer/order';
import { SearchReducer } from 'redux/reducer/search';
import { AffiliateReducer } from 'redux/reducer/affiliate';
import {
  ShareInstanceState,
  RootInstancePageState,
  HomeInstancePageState,
  CartInstancePageState,
  UserInstancePageState,
  WalletInitialState,
  OrderInitialState,
  SearchInstancePageState,
  AffiliateInitialState,
} from 'interfaces/reducers/instance';
import { GlobalReducer } from './reducer';

export interface RootState {
  shareReducer: ShareInstanceState;
  rootPage: RootInstancePageState;
  homePage: HomeInstancePageState;
  cart: CartInstancePageState;
  user: UserInstancePageState;
  wallet: WalletInitialState;
  order: OrderInitialState;
  search: SearchInstancePageState;
  affiliate: AffiliateInitialState;
}

export const rootReducer = combineReducers({
  shareReducer: GlobalReducer,
  rootPage: RootPageReducer,
  homePage: HomeReducer,
  cart: CartReducer,
  user: UserReducer,
  wallet: walletReducer,
  order: orderReducer,
  search: SearchReducer,
  affiliate: AffiliateReducer,
});
