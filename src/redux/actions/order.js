export const ORDER_SAVE_ANSWER = 'ORDER_SAVE_ANSWER';
export const orderSaveAnswer = (
  key,
  value,
  keyTitle,
  valueTitle,
  _tracker
) => ({
  type: ORDER_SAVE_ANSWER,
  key,
  value,
  keyTitle,
  valueTitle,
  _tracker,
});

export const ORDER_CLEAR_ANSWER = 'ORDER_CLEAR_ANSWER';
export const orderClearAnswer = () => ({ type: ORDER_CLEAR_ANSWER });

export const ORDER_CLEAR = 'ORDER_CLEAR';
export const orderClear = () => ({ type: ORDER_CLEAR });

export const ORDER_NEXT = 'ORDER_NEXT';
export const orderNext = (question) => ({
  type: ORDER_NEXT,
  question,
});

export const ORDER_PREV = 'ORDER_PREV';
export const orderPrev = () => ({ type: ORDER_PREV });
