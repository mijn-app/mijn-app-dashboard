import { JOURNEY_START } from '../../helpers/common';
import {
  ORDER_SAVE_ANSWER,
  ORDER_CLEAR_ANSWER,
  ORDER_NEXT,
  ORDER_PREV,
  CLEAR_ORDER,
} from '../actions/order';
import { SET_JOURNEY } from '../actions/journey';

export const order = (state = { data: [], current: JOURNEY_START }, action) => {
  switch (action.type) {
    case SET_JOURNEY:
    case CLEAR_ORDER:
      return { data: [], current: JOURNEY_START };
    case ORDER_SAVE_ANSWER:
    case ORDER_CLEAR_ANSWER:
      return {
        ...state,
        data: state.data.map(
          (o, i) => (i === state.current ? item(o, action) : o)
        ),
      };
    case ORDER_NEXT: {
      let nextCurrent = state.current === JOURNEY_START ? 0 : state.current + 1;
      return {
        ...state,
        current: nextCurrent,
        data:
          nextCurrent < state.data.length
            ? state.data[nextCurrent].question === action.question
              ? [...state.data]
              : [
                ...state.data.filter((o, i) => i < nextCurrent),
                item(null, action),
              ]
            : [...state.data, item(null, action)],
      };
    }
    case ORDER_PREV:
      return {
        ...state,
        current: state.current === 0 ? JOURNEY_START : state.current - 1,
      };
    default:
      return state;
  }
};

const item = (
  state = {
    question: null,
    key: null,
    value: null,
    keyTitle: null,
    valueTitle: null,
    _tracker: null,
  },
  action
) => {
  switch (action.type) {
    case ORDER_SAVE_ANSWER:
      return {
        ...state,
        key: action.key,
        value: action.value,
        keyTitle: action.keyTitle,
        valueTitle: action.valueTitle,
        _tracker: action._tracker,
      };
    case ORDER_CLEAR_ANSWER:
      return {
        ...state,
        key: null,
        value: null,
        keyTitle: null,
        valueTitle: null,
        _tracker: null,
      };
    case ORDER_NEXT:
      return {
        ...state,
        question: action.question,
      };
    default:
      return state;
  }
};
