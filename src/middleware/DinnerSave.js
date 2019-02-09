import saveAs from 'file-saver';

export const SAVE_DINNERS = 'SAVE_DINNERS';

const mealPlanMiddleware = store => next => (action) => {
  switch (action.type) {
    case SAVE_DINNERS: {
      const blob = new Blob([JSON.stringify(store.getState().dinners)], { type: 'application/json;charset=utf-8' });
      saveAs(blob, 'dinners.json');
      break;
    }
    default:
      next(action);
  }
};

export default mealPlanMiddleware;
