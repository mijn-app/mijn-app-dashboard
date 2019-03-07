import { SET_JOURNEYS } from '../actions/journeys';

export const journeys = (state = { data: [] }, action) => {
  switch (action.type) {
    case SET_JOURNEYS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
