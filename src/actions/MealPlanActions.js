import { GENERATE_MEAL_PLAN } from '../middleware/MealPlan';

export const FETCH_MEAL_PLAN_DAY = 'FETCH_MEAL_PLAN_DAY';
export const TOGGLE_LOCK_MEAL_PLAN_DAY = 'TOGGLE_LOCK_MEAL_PLAN_DAY';
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
  const mealPlanDay = null;

  return {
    type: FETCH_MEAL_PLAN_DAY,
    payload: {
      day,
      mealPlanDay,
    },
  };
}

export function toggleLockMealPlanDay(day) {
  const mealPlanDay = null;

  return {
    type: TOGGLE_LOCK_MEAL_PLAN_DAY,
    payload: {
      day,
      mealPlanDay,
    },
  };
}
