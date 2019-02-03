import { createStore } from 'redux';

import { loadState, saveState } from './localStorage';
import reducers from './reducers';

const persistedState = loadState();

const store = createStore(
    reducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

export default store;