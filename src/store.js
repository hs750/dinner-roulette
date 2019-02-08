import _ from 'lodash';
import { createStore, compose } from 'redux';

import { loadState, saveState } from './localStorage';
import reducers from './reducers';
import middleware from './middleware';

const persistedState = loadState();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(middleware),
);

// Subscribe to store updates, saving dinners to local storage. Limit LS updates to once a second.
// TODO use middleware
store.subscribe(_.throttle(() => {
  saveState({
    dinners: store.getState().dinners,
  });
}, 1000));

export default store;
