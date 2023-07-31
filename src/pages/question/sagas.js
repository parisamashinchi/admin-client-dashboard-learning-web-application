import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";



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


export default [ getDataByFilterSaga()];
