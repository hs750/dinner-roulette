import { fetchMealPlanMock, fetchMealPlanDayMock, toggleLockMealPlanDayMock } from '../services/MealPlanService';

export const FETCH_MEAL_PLAN = 'FETCH_MEAL_PLAN';
export const FETCH_MEAL_PLAN_DAY = 'FETCH_MEAL_PLAN_DAY';
export const TOGGLE_LOCK_MEAL_PLAN_DAY = 'TOGGLE_LOCK_MEAL_PLAN_DAY';

export function fetchMealPlan(reroll) {
  const mealPlan = fetchMealPlanMock(reroll);

  return {
    type: FETCH_MEAL_PLAN,
    payload: mealPlan
  };
}

export function fetchMealPlanDay(day) {
  const mealPlanDay = fetchMealPlanDayMock(day);

  return {
    type: FETCH_MEAL_PLAN_DAY,
    payload: {
      day: day,
      mealPlanDay: mealPlanDay
    }
  };
}

export function toggleLockMealPlanDay(day) {
  const mealPlanDay = toggleLockMealPlanDayMock(day);

  return {
    type: TOGGLE_LOCK_MEAL_PLAN_DAY,
    payload: {
      day: day,
      mealPlanDay: mealPlanDay
    }
  }
}