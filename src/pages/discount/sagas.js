import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";

function* getStudent() {
  try {
    yield put(loadingAction(constants.STUDENTS, true));
    const students = yield call(getRequest, constants.STUDENTS_URL, {limit: 200});
    const courses = yield call(getRequest, constants.COURSE_URL, {limit: 200});
    const category = yield call(getRequest, constants.CATEGORY_URL, {limit: 200});
    yield put(actions.setStudents({
        STUDENT: students.data,
        COURSE: courses.data,
        CATEGORY: category.data
    }));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.STUDENTS, false));
  }
}

function* getStudentByFilter(action) {
    const {filter, type, key} = action.payload;
    try {
        yield put(loadingAction(constants.STUDENTS, true));
        const response = yield call(getRequest, constants[`${type}_URL`], {[key]: filter, limit: 200});
        yield put(actions.setStudentsByFilter({
            [type]: response.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.STUDENTS, false));
    }
}

export function* getStudentSaga() {
  yield takeLatest(constants.GET_STUDENTS, getStudent);
}

export function* getStudentByFilterSaga() {
    yield takeLatest(constants.GET_STUDENTS_BY_FILTER, getStudentByFilter);
}

export default [getStudentSaga(), getStudentByFilterSaga()];
