import _ from 'lodash';
import { createStore } from 'redux';

import { loadState, saveState } from './localStorage';
import reducers from './reducers';

const persistedState = loadState();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

// Subscribe to store updates, saving dinners to local storage. Limit LS updates to once a second.
// TODO use middleware
store.subscribe(_.throttle(() => {
  saveState({
    dinners: store.getState().dinners,
  });
}, 1000));

export default store;
