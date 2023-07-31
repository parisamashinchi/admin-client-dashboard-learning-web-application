import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";

function* getLessons() {
  try {
    yield put(loadingAction(constants.LESSONS, true));
    const videos = yield call(getRequest, constants.VIDEO_URL, {limit: 200, 'filter[is_published]': 1});
    const exams = yield call(getRequest, constants.EXAM_URL, {limit: 200, 'filter[is_published]': 1});
    const readings = yield call(getRequest, constants.READING_URL, {limit: 200, 'filter[is_published]': 1});
    const survey = yield call(getRequest, constants.SURVEY_URL);
    const live = yield call(getRequest, constants.LIVE_URL);
    yield put(actions.setLessons({VIDEO: videos.data, EXAM: exams.data, READING: readings.data, SURVEY: survey.data, LIVE: live.data}));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.LESSONS, false));
  }
}

function* getDataByFilter(action) {
    const {filter, type, key} = action.payload;
    try {
        yield put(loadingAction(constants.LESSONS, true));
        const response = yield call(getRequest, constants[`${type}_URL`], {[key]: filter, limit: 200, 'filter[is_published]': 1});
        yield put(actions.setDataByFilter({
            [type]: response.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.LESSONS, false));
    }
}
export function* getLessonsSaga() {
  yield takeLatest(constants.GET_LESSONS, getLessons);
}

export function* getDataByFilterSaga() {
  yield takeLatest(constants.GET_LESSONS_BY_FILTER, getDataByFilter);
}

export default [getLessonsSaga(), getDataByFilterSaga()];
