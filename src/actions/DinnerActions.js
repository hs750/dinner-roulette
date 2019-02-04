import {
  createDinnerMock, deleteDinnerMock, fetchDinnerMock, fetchDinnersMock,
} from '../services/DinnerService';

export const CREATE_DINNER = 'CREATE_DINNER';
export const DELETE_DINNER = 'DELETE_DINNER';
export const FETCH_DINNER = 'FETCH_DINNER';
export const FETCH_DINNERS = 'FETCH_DINNERS';

export function createDinner(values, callback) {
  const dinner = createDinnerMock(values);
  callback();

  return {
    type: CREATE_DINNER,
    payload: dinner,
  };
}

export function deleteDinner(id, callback) {
  deleteDinnerMock(id);
  callback();

  return {
    type: DELETE_DINNER,
    payload: id,
  };
}

export function fetchDinner(id) {
  const dinner = fetchDinnerMock(id);

  return {
    type: FETCH_DINNER,
    payload: dinner,
  };
}

export function fetchDinners() {
  const dinners = fetchDinnersMock();

  return {
    type: FETCH_DINNERS,
    payload: dinners,
  };
}
