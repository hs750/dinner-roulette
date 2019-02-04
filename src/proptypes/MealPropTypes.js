import PropTypes from 'prop-types';

import DinnerPropType from './DinnerPropTypes';

export const MealDayPropTypes = PropTypes.shape(
  {
    dinner: DinnerPropType,
    isLocked: PropTypes.bool.isRequired,
  },
);

export const MealPropTypes = PropTypes.shape(
  {
    Monday: MealDayPropTypes,
    Tuesday: MealDayPropTypes,
    Wednesday: MealDayPropTypes,
    Thursday: MealDayPropTypes,
    Friday: MealDayPropTypes,
    Saturday: MealDayPropTypes,
    Sunday: MealDayPropTypes,
  },
);
