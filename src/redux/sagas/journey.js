import { takeLatest, put } from 'redux-saga/effects';
import { DELETE_QUESTION_PREFLIGHT } from '../actions/journey';
import { store } from '../store';
import {
  uiSidePanelClose,
  uiDeselectQuestion,
  uiDeleteDialogOpen,
  uiDeleteDialogSetStart,
  uiDeleteDialogSetAutoResolve,
  uiDeleteDialogSetManualResolve,
} from '../actions/journeyUi';
import { SET_QUESTION_TYPE, deleteQuestion } from '../actions/journey';
import { JOURNEY_END, QUESTION_TYPE_END } from '../../helpers/common';

export function* watchDeleteQuestionPreflight() {
  yield takeLatest(DELETE_QUESTION_PREFLIGHT, deleteQuestionPreflightCheck);
}

function* deleteQuestionPreflightCheck(action) {
  if (action && action.id) {
    yield put(uiDeleteDialogOpen());
    if (action.id === 'START') {
      yield put(uiDeleteDialogSetStart());
    } else {
      let state = store.getState();
      if (
        state &&
        state.journey &&
        state.journey.questions &&
        Array.isArray(state.journey.questions) &&
        state.journey.questions.length > 0
      ) {
        let q = state.journey.questions.find((i) => i.id === action.id);
        if (q) {
          let found =
            q && q.options && Array.isArray(q.options) && q.options.length > 0
              ? q.options.map((o) => (o && o.goto ? o.goto : null))
              : [];
          found.push(q.next || null);
          found.push(q.optional && q.optional.goto ? q.optional.goto : null);
          found = found
            .filter((i) => !!i)
            .filter((item, index, arr) => arr.indexOf(item) === index);
          if (found.length === 0) {
            yield put(uiDeleteDialogSetAutoResolve(action.id, null));
          } else if (found.length === 1) {
            yield put(uiDeleteDialogSetAutoResolve(action.id, found[0]));
          } else {
            yield put(uiDeleteDialogSetManualResolve(action.id, found));
          }
        }
      }
    }
  }
}

export function* watchSetQuestionType() {
  yield takeLatest(SET_QUESTION_TYPE, setQuestionTypeChecks);
}

function* setQuestionTypeChecks(action) {
  if (action.questionType === QUESTION_TYPE_END) {
    yield put(uiSidePanelClose());
    yield put(uiDeselectQuestion());
    yield put(deleteQuestion(action.id, JOURNEY_END));
  }
}
