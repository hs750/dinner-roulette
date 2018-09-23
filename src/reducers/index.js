import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import DinnerReducer from './DinnersReducer';
import MealPlanReducer from './MealPlanReducer';

const rootReducer = combineReducers({
  dinners: DinnerReducer,
  form: FormReducer,
  mealPlan: MealPlanReducer,
});

export default rootReducer;
