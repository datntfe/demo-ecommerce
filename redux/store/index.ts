import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import { rootReducer } from 'redux/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    /* 'rootPage', 'user', 'shareReducer' */
  ],
};
const composeEnhancers = composeWithDevTools({});

const middleware = [];
middleware.push(ReduxThunk);

const configureStore = createStore(
  persistReducer(persistConfig, rootReducer),
  composeEnhancers(applyMiddleware(...middleware)),
);

export default configureStore;
export const persistor = persistStore(configureStore);
