import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import DinnerIndex from './components/DinnerIndex';
import DinnerNew from './components/DinnerNew';
import DinnerShow from './components/DinnerShow';
import Home from './components/Home';
import MealPlan from './components/MealPlan';
import store from './store';

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
