import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import compact from 'lodash/fp/compact';
import { createLogger } from 'redux-logger';

import { createReducer } from './rootReducer';
import arrayMiddleware from './middlewares/arrayMiddleware';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: 'BOGGLE',
    }) : compose;
/* eslint-enable no-underscore-dangle */

const middlewares = [
  thunk,
  arrayMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

const enhancers = compact([
  applyMiddleware(
    ...middlewares,
  ),
]);

export default (initialState = {}) => {
  const rootReducer = createReducer();
  const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      // eslint-disable-next-line global-require
      const createNextReducer = require('./rootReducer').default;
      const nextRootReducer = createNextReducer();
      store.replaceReducer(nextRootReducer);
    });
  }

  // eslint-disable-next-line
  store.asyncReducers = {};

  return { store };
};
