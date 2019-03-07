import { put, call, takeLatest } from 'redux-saga/effects';
import { SELECT_PAGE, SELECT_PAGE_NO_HISTORY } from '../actions/application';
import { requestOrdersList } from '../actions/orders';

export function* watchSelectPage() {
  yield takeLatest(SELECT_PAGE, pageSelected);
}

function* pageSelected(action) {
  yield call(scrollToTop());
  yield fetchHelper(action);
  yield call(setHistory(action.page, action.page, action.page));
}

export function* watchSelectPageNoHistory() {
  yield takeLatest(SELECT_PAGE_NO_HISTORY, pageSelectedNoHistory);
}

function* pageSelectedNoHistory(action) {
  yield call(scrollToTop());
  yield fetchHelper(action);
}

const scrollToTop = () => async () => {
  window.scrollTo(0, 0);
};

function* fetchHelper(action) {
  
  switch (action.page) {
    case 'actions': {
      yield put(requestOrdersList());
      break;
    }
    default:
      return;
  }
}

const setHistory = (state, title, url) => async () => {
  history.pushState(state, title, url);
};
