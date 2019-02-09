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

function rerollMealPlanForDay(currentMealPlan, dinners, day, reroll) {
  if (reroll) {
    return generateMealPlanForDay(currentMealPlan, dinners, day);
  }
  return currentMealPlan[day].dinner || generateMealPlanForDay(currentMealPlan, dinners, day);
}

function generateMealPlan(currentMealPlan, dinners, reroll) {
  const mealPlan = currentMealPlan;

  mealPlan.Monday.dinner = rerollMealPlanForDay(currentMealPlan, dinners, 'Monday', reroll);
  mealPlan.Tuesday.dinner = rerollMealPlanForDay(currentMealPlan, dinners, 'Tuesday', reroll);
  mealPlan.Wednesday.dinner = rerollMealPlanForDay(currentMealPlan, dinners, 'Wednesday', reroll);
  mealPlan.Thursday.dinner = rerollMealPlanForDay(currentMealPlan, dinners, 'Thursday', reroll);
  mealPlan.Friday.dinner = rerollMealPlanForDay(currentMealPlan, dinners, 'Friday', reroll);
  mealPlan.Saturday.dinner = rerollMealPlanForDay(currentMealPlan, dinners, 'Saturday', reroll);
  mealPlan.Sunday.dinner = rerollMealPlanForDay(currentMealPlan, dinners, 'Sunday', reroll);

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
