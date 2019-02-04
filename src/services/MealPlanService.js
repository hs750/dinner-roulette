import _ from 'lodash';

import { fetchDinnersSizeMock, fetchRandomDinnerMock } from './DinnerService';

const mealPlan = {
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

function isDuplicateDinner(dinner) {
  return _.some(
    _.values(mealPlan),
    x => x.dinner !== null && x.dinner.id === dinner.id,
  );
}

export function fetchMealPlanDayMock(day) {
  if (!mealPlan[day].isLocked) {
    let dinner = {
      id: -1,
      title: 'Not Enough Dinners',
      description: 'Not enough dinners created to fill this day.',
    };

    let isDuplicate = true && fetchDinnersSizeMock() >= 8;
    while (isDuplicate) {
      dinner = fetchRandomDinnerMock();
      isDuplicate = isDuplicateDinner(dinner);
    }
    mealPlan[day].dinner = dinner;
  }

  return mealPlan[day];
}

export function fetchMealPlanMock(reroll) {
  if (!reroll) {
    mealPlan.Monday.isLocked = false;
    mealPlan.Tuesday.isLocked = false;
    mealPlan.Wednesday.isLocked = false;
    mealPlan.Thursday.isLocked = false;
    mealPlan.Friday.isLocked = false;
    mealPlan.Saturday.isLocked = false;
    mealPlan.Sunday.isLocked = false;
  }

  fetchMealPlanDayMock('Monday');
  fetchMealPlanDayMock('Tuesday');
  fetchMealPlanDayMock('Wednesday');
  fetchMealPlanDayMock('Thursday');
  fetchMealPlanDayMock('Friday');
  fetchMealPlanDayMock('Saturday');
  fetchMealPlanDayMock('Sunday');

  return mealPlan;
}

export function toggleLockMealPlanDayMock(day) {
  mealPlan[day].isLocked = !mealPlan[day].isLocked;
  return mealPlan[day];
}
