import { applyMiddleware } from 'redux';

import MealPlan from './MealPlan';

const middleware = applyMiddleware(
  MealPlan,
);

export default middleware;
