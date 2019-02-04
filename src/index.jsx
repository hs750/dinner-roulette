import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import './index.css';
import reducers from './reducers';
import DinnerIndex from './components/DinnerIndex';
import DinnerNew from './components/DinnerNew';
import DinnerShow from './components/DinnerShow';
import Home from './components/Home';
import MealPlan from './components/MealPlan';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/dinner/new" component={DinnerNew} />
        <Route path="/dinner/:id" component={DinnerShow} />
        <Route path="/dinner" component={DinnerIndex} />
        <Route path="/meal-plan" component={MealPlan} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
