import { GENERATE_MEAL_PLAN, GENERATE_MEAL_PLAN_DAY, TOGGLE_LOCK_MEAL_PLAN_DAY } from '../middleware/MealPlan';

export const NEW_MEAL_PLAN = 'NEW_MEAL_PLAN';

export function fetchMealPlan(reroll) {
  return {
    type: GENERATE_MEAL_PLAN,
    payload: {
      reroll,
      nextAction: NEW_MEAL_PLAN,
    },
  };
}

export function fetchMealPlanDay(day) {
  return {
    type: GENERATE_MEAL_PLAN_DAY,
    payload: {
      day,
      nextAction: NEW_MEAL_PLAN,
    },
  };
}

export function toggleLockMealPlanDay(day) {
  return {
    type: TOGGLE_LOCK_MEAL_PLAN_DAY,
    payload: {
      day,
      nextAction: NEW_MEAL_PLAN,
    },
  };
}
