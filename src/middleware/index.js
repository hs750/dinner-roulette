import { applyMiddleware } from 'redux';

import MealPlan from './MealPlan';
import DinnerSave from './DinnerSave';

const middleware = applyMiddleware(
  MealPlan,
  DinnerSave,
);

export default middleware;
