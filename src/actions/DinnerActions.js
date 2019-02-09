import { v1 } from 'uuid';

import { SAVE_DINNERS } from '../middleware/DinnerSave';

export const CREATE_DINNER = 'CREATE_DINNER';
export const DELETE_DINNER = 'DELETE_DINNER';
export const FETCH_DINNER = 'FETCH_DINNER';
export const FETCH_DINNERS = 'FETCH_DINNERS';
export const LOAD_DEFAULT_DINNERS = 'LOAD_DEFAULT_DINNERS';

export function createDinner(values, callback) {
  const dinner = {
    id: v1(),
    title: values.title,
    description: values.description,
  };
  callback();

  return {
    type: CREATE_DINNER,
    payload: dinner,
  };
}

export function deleteDinner(id, callback) {
  callback();

  return {
    type: DELETE_DINNER,
    payload: id,
  };
}

export function loadDefaultDinners() {
  return {
    type: LOAD_DEFAULT_DINNERS,
  };
}

export function saveDinners() {
  return {
    type: SAVE_DINNERS,
  };
}
