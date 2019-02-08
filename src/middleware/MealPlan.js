import _ from 'lodash';

export const GENERATE_MEAL_PLAN = 'GENERATE_MEAL_PLAN';

const initialMealPlan = {
  Monday: {
    dinner: null,
    isLocked: false,
  },
  Tuesday: {
    dinner: null,
    isLocked: false,
  },
  Wednesday: {
    dinner: null,
    isLocked: false,
  },
  Thursday: {
    dinner: null,
    isLocked: false,
  },
  Friday: {
    dinner: null,
    isLocked: false,
  },
  Saturday: {
    dinner: null,
    isLocked: false,
  },
  Sunday: {
    dinner: null,
    isLocked: false,
  },
};

function isDuplicateDinner(mealPlan, dinner) {
  return _.some(
    _.values(mealPlan),
    x => x.dinner !== null && x.dinner.id === dinner.id,
  );
}

function generateMealPlanForDay(currentMealPlan, dinners, day) {
  if (!currentMealPlan[day].isLocked) {
    let dinner = {
      id: -1,
      title: 'Not Enough Dinners',
      description: 'Not enough dinners created to fill this day.',
    };

    let isDuplicate = true && dinners.length >= 8;
    while (isDuplicate) {
      dinner = _.sample(dinners);
      isDuplicate = isDuplicateDinner(currentMealPlan, dinner);
    }
    return dinner;
  }

  return _.cloneDeep(currentMealPlan[day]);
}

function generateMealPlan(currentMealPlan, dinners, reroll) {
  const mealPlan = _.cloneDeep(currentMealPlan);
  if (!reroll) {
    mealPlan.Monday.isLocked = false;
    mealPlan.Tuesday.isLocked = false;
    mealPlan.Wednesday.isLocked = false;
    mealPlan.Thursday.isLocked = false;
    mealPlan.Friday.isLocked = false;
    mealPlan.Saturday.isLocked = false;
    mealPlan.Sunday.isLocked = false;
  }

  mealPlan.Monday.dinner = generateMealPlanForDay(currentMealPlan, dinners, 'Monday');
  mealPlan.Tuesday.dinner = generateMealPlanForDay(currentMealPlan, dinners, 'Tuesday');
  mealPlan.Wednesday.dinner = generateMealPlanForDay(currentMealPlan, dinners, 'Wednesday');
  mealPlan.Thursday.dinner = generateMealPlanForDay(currentMealPlan, dinners, 'Thursday');
  mealPlan.Friday.dinner = generateMealPlanForDay(currentMealPlan, dinners, 'Friday');
  mealPlan.Saturday.dinner = generateMealPlanForDay(currentMealPlan, dinners, 'Saturday');
  mealPlan.Sunday.dinner = generateMealPlanForDay(currentMealPlan, dinners, 'Sunday');

  return mealPlan;
}

const mealPlanMiddleware = store => next => (action) => {
  if (action.type === GENERATE_MEAL_PLAN) {
    let { mealPlan } = store.getState();
    const { dinners } = store.getState();
    if (!mealPlan) {
      mealPlan = initialMealPlan;
    }
    mealPlan = generateMealPlan(mealPlan, dinners, action.payload.reroll);

    next({
      type: action.payload.nextAction,
      payload: mealPlan,
    });
  } else {
    next(action);
  }
};

export default mealPlanMiddleware;
