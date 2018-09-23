import _ from 'lodash';

import { DELETE_DINNER, FETCH_DINNER, FETCH_DINNERS } from '../actions/DinnerActions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_DINNER:
      return _.omit(state, action.payload);

    case FETCH_DINNER:
      const dinner = action.payload;
      return { ...state, [dinner.id]: dinner };

    case FETCH_DINNERS:
      return _.mapKeys(action.payload, 'id');
      
    default:
      return state;
  }
}