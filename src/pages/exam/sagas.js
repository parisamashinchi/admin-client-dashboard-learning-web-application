import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";

function* getQuestion() {
  try {
    yield put(loadingAction(constants.QUESTION, true));
    const questions = yield call(getRequest, constants.QUESTION_URL, {limit: 200});
    yield put(actions.setQuestion({
        QUESTION: questions.data,
    }));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.QUESTION, false));
  }
}

function* getQuestionByFilter(action) {
    const {filter, type, key} = action.payload;
    try {
        yield put(loadingAction(constants.QUESTION, true));
        const response = yield call(getRequest, constants[`${type}_URL`], {[key]: filter, limit: 200});
        yield put(actions.setQuestionByFilter({
            [type]: response.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.QUESTION, false));
    }
}

export function* getQuestionSaga() {
  yield takeLatest(constants.GET_QUESTIONS, getQuestion);
}

export function* getQuestionByFilterSaga() {
    yield takeLatest(constants.GET_QUESTIONS_BY_FILTER, getQuestionByFilter);
}

export default [getQuestionSaga(), getQuestionByFilterSaga()];
