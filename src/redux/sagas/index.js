import { all } from 'redux-saga/effects';
import { watchRequestOrdersList } from './orders';
import { watchSelectPage, watchSelectPageNoHistory } from './application';
import { watchDeleteQuestionPreflight, watchSetQuestionType } from './journey';

export default function* rootSaga() {
  yield all([
    watchRequestOrdersList(),
    watchSelectPage(),
    watchSelectPageNoHistory(),
    watchDeleteQuestionPreflight(),
    watchSetQuestionType(),
  ]);
}
