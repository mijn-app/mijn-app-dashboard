import {
  REQUEST_ORDERS_LIST,
  REQUEST_ORDERS_LIST_SUCCESS,
  REQUEST_ORDERS_LIST_FAILED,
  SET_ORDER_ITEM,
  REQUEST_ORDERS_ITEM,
  REQUEST_ORDERS_ITEM_SUCCESS,
  REQUEST_ORDERS_ITEM_FAILED,
} from '../actions/orders';

export const orders = (state = { list: [], item: {} }, action) => {
  switch (action.type) {
    case REQUEST_ORDERS_LIST:
      return { ...state };
    case REQUEST_ORDERS_LIST_SUCCESS:
      return { ...state, list: action.data, listError: null };
    case REQUEST_ORDERS_LIST_FAILED:
      return { ...state, listError: action.error };
    case SET_ORDER_ITEM:
      return { ...state, item: action.item };
    case REQUEST_ORDERS_ITEM:
      return { ...state };
    case REQUEST_ORDERS_ITEM_SUCCESS:
      return { ...state, item: action.data, itemError: null };
    case REQUEST_ORDERS_ITEM_FAILED:
      return { ...state, itemError: action.error };
    default:
      return state;
  }
};
