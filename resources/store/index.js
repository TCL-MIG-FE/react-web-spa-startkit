import { createStore, applyMiddleware } from 'redux';

// middleware
import thunkMiddleware from 'redux-thunk';
import asyncMiddleware from 'redux-async';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { logger, delay } from '../middleware';

// reducer
import rootReducer from '../reducers';

export default (initialState) => {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const createStoreWithMiddleware = applyMiddleware(
    // logger,
    delay,
    thunkMiddleware,
    asyncMiddleware,
    syncHistory(browserHistory)
  )(create);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if(module.hot) {
    console.log('hot');
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    });
  }
  return store;
}