import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest, postRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";

function* getCourse() {
    try {
        console.log('here')
        yield put(loadingAction(constants.PACKAGE_DATA, true));
        const courses = yield call(getRequest, constants.COURSE_URL, {limit: 200, 'filter[is_published]': 1});
        const teacher = yield call(getRequest, constants.TEACHER_URL, {limit: 200});
        const category = yield call(getRequest, constants.CATEGORY_URL, {limit: 200});
        yield put(actions.setCourse({
            COURSE: courses.data,
            TEACHER: teacher.data,
            CATEGORY: category.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.PACKAGE_DATA, false));
    }
}

function* getSellType( action) {

    console.log(action.payload.data)
    try {
        console.log('here')
        yield put(loadingAction(constants.PACKAGE_DATA, true));
        const sell_type = yield call(getRequest, constants.COURSE_URL + '/'+ action.payload.data +'/course_sell_type');
        yield put(actions.setSellType({
            Sell_type: sell_type.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.PACKAGE_DATA, false));
    }
}


function* getDataByFilter(action) {
    const {filter, type, key} = action.payload;
    console.log(filter, type, key)
    console.log("action.payload",  action.payload);
    try {
        yield put(loadingAction(constants.PACKAGE_DATA, true));
        const response = yield call(getRequest, constants[`${type}_URL`], {[key]: filter, limit: 200});
        yield put(actions.setDataByFilter({
            [type]: response.data,
        }));
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.PACKAGE_DATA, false));
    }
}


export function* getDataByFilterSaga() {
    yield takeLatest(constants.GET_BY_FILTER, getDataByFilter);
}
export function* getCourseSaga() {
    yield takeLatest(constants.GET_COURSE, getCourse);
}
export function* getSellTypeSaga() {
    yield takeLatest(constants.GET_SELL_TYPE, getSellType);
}

export default [getCourseSaga(), getSellTypeSaga(), getDataByFilterSaga()];
