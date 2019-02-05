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

store.subscribe(() => {
  saveState({
    dinners: store.getState().dinners,
  });
});

export default store;
