import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";

function* getCourses() {
  try {
    yield put(loadingAction(constants.ALBUM, true));
    const courses = yield call(getRequest, constants.COURSES_URL, {limit: 200});
    const packageData = yield call(getRequest, constants.PACKAGE_URL, {limit: 200});
    yield put(actions.setCourses({
          COURSE: courses.data,
          PACKAGE: packageData.data
    }));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.ALBUM, false));
  }
}

function* getCoursesByFilter(action) {
    const {filter, key} = action.payload;
    console.log("action.payload",  action.payload);
    try {
        yield put(loadingAction(constants.ALBUM, true));
        const response = yield call(getRequest, constants.COURSES_URL, {[key]: filter, limit: 200, 'filter[is_published]': 1});
        yield put(actions.setCoursesByFilter(response.data));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.ALBUM, false));
    }
}

export function* getCoursesSaga() {
  yield takeLatest(constants.GET_COURSES, getCourses);
}

export function* getCoursesByFilterSaga() {
    yield takeLatest(constants.GET_COURSES_BY_FILTER, getCoursesByFilter);
}

export default [getCoursesSaga(), getCoursesByFilterSaga()];
