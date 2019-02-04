import _ from 'lodash';

import { FETCH_MEAL_PLAN, FETCH_MEAL_PLAN_DAY, TOGGLE_LOCK_MEAL_PLAN_DAY } from '../actions/MealPlanActions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_MEAL_PLAN:
      return _.cloneDeep(action.payload);
    case FETCH_MEAL_PLAN_DAY:
    case TOGGLE_LOCK_MEAL_PLAN_DAY: {
      const newState = _.cloneDeep(state);
      newState[action.payload.day] = action.payload.mealPlanDay;
      return newState;
    }
    default:
      return state;
  }
}
