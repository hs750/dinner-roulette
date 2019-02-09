import _ from 'lodash';

import { NEW_MEAL_PLAN } from '../actions/MealPlanActions';

export default function (state = null, action) {
  switch (action.type) {
    case NEW_MEAL_PLAN:
      return _.cloneDeep(action.payload);
    default:
      return state;
  }
}
