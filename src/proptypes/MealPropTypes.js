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
    Monday: MealDayPropTypes.isRequired,
    Tuesday: MealDayPropTypes.isRequired,
    Wednesday: MealDayPropTypes.isRequired,
    Thursday: MealDayPropTypes.isRequired,
    Friday: MealDayPropTypes.isRequired,
    Saturday: MealDayPropTypes.isRequired,
    Sunday: MealDayPropTypes.isRequired,
  },
);
