import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest , postRequest, putRequest} from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";


function* getCommentData() {
    try {
        yield put(loadingAction(constants.COURSE_DATA, true));
        const courses = yield call(getRequest, constants.COURSE_URL, {limit: 200, 'filter[is_published]': 1});
        const students = yield call(getRequest, constants.STUDENTS_URL, {limit: 200});
        yield put(actions.setCommentData({
            COURSE: courses.data,
            STUDENT: students.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.COURSE_DATA, false));
    }
}
function* getDataCommentByFilter(action) {
    const {filter, type, key} = action.payload;
    try {
        yield put(loadingAction(constants.COURSE_DATA, true));
        const response = yield call(getRequest, constants[`${type}_URL`], {[key]: filter, limit: 200});
        yield put(actions.setDataCommentByFilter({
            [type]: response.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.COURSE_DATA, false));
    }
}
export function* getCommentDataSaga() {
    yield takeLatest(constants.GET_COMMENT_DATA, getCommentData);
}

export function* getDataCommentByFilterSaga() {
    yield takeLatest(constants.GET_DATA_COMMENT_BY_FILTER, getDataCommentByFilter);
}
export default [
    getCommentDataSaga(),
    getDataCommentByFilterSaga(),
];