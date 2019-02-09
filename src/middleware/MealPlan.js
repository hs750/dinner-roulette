import _ from 'lodash';

export const GENERATE_MEAL_PLAN = 'GENERATE_MEAL_PLAN';
export const GENERATE_MEAL_PLAN_DAY = 'GENERATE_MEAL_PLAN_DAY';
export const TOGGLE_LOCK_MEAL_PLAN_DAY = 'TOGGLE_LOCK_MEAL_PLAN_DAY';

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

    let isDuplicate = true && Object.keys(dinners).length >= 8;
    while (isDuplicate) {
      dinner = _.sample(dinners);
      isDuplicate = isDuplicateDinner(currentMealPlan, dinner);
    }
    return dinner;
  }

  return currentMealPlan[day].dinner;
}

function generateMealPlan(currentMealPlan, dinners, reroll) {
  const mealPlan = currentMealPlan;
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

function getMealPlanFromStoreOrDefault(store) {
  let { mealPlan } = store.getState();
  if (!mealPlan) {
    mealPlan = _.cloneDeep(initialMealPlan);
  }
  return mealPlan;
}

const mealPlanMiddleware = store => next => (action) => {
  switch (action.type) {
    case GENERATE_MEAL_PLAN: {
      let mealPlan = getMealPlanFromStoreOrDefault(store);
      const { dinners } = store.getState();
      mealPlan = generateMealPlan(mealPlan, dinners, action.payload.reroll);

      next({
        type: action.payload.nextAction,
        payload: mealPlan,
      });
      break;
    }
    case GENERATE_MEAL_PLAN_DAY: {
      const mealPlan = getMealPlanFromStoreOrDefault(store);
      const { dinners } = store.getState();
      const { day } = action.payload;
      mealPlan[day].dinner = generateMealPlanForDay(mealPlan, dinners, day);

      next({
        type: action.payload.nextAction,
        payload: mealPlan,
      });
      break;
    }
    case TOGGLE_LOCK_MEAL_PLAN_DAY: {
      const mealPlan = getMealPlanFromStoreOrDefault(store);
      const { day } = action.payload;
      mealPlan[day].isLocked = !mealPlan[day].isLocked;
      next({
        type: action.payload.nextAction,
        payload: mealPlan,
      });
      break;
    }
    default:
      next(action);
  }
};

export default mealPlanMiddleware;
