import { all, call, put, takeLatest } from "redux-saga/effects";
import { getRequest,postRequest } from "utils/api/agent";
import * as actions from "./actions";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import {message} from "antd";

function* getProfileInfo() {
    try {
        yield put(loadingAction(constants.PROFILE, true));
        const response = yield call(getRequest, constants.GET_PROFILE_INFO_URL);
        yield put(actions.setProfileInfo(response));
    } catch (e) {
        yield put(message.error(e));
    } finally {
        yield put(loadingAction(constants.PROFILE, false));
    }
}

function* EditProfile(action) {
    const { data } = action.payload;
    try {
        yield put(loadingAction(constants.PROFILE, true));
        const response = yield call(postRequest, constants.GET_PROFILE_INFO_URL, action.payload);
        yield put(actions.setProfileInfo(response));
    } catch (e) {
        yield put(message.error(e.text.meta.error_message));
    } finally {
        yield put(loadingAction(constants.PROFILE, false));
    }
}

function* changePassword(action) {
    const { data } = action.payload;
    try {
        yield put(loadingAction(constants.PROFILE, true));
        yield call(postRequest, constants.CHANGE_PASSWORD_URL, data);
    } catch (e) {

    } finally {
        yield put(loadingAction(constants.PROFILE, false));
    }
}

export function* getProfileInfoSaga() {
    yield takeLatest(constants.GET_PROFILE_INFO, getProfileInfo);
}
export function* EditProfileSaga() {
  yield takeLatest(constants.EDIT_PROFILE, EditProfile);
}
export function* changePasswordSaga() {
    yield takeLatest(constants.CHANGE_PASSWORD, changePassword);
}

export default [
    getProfileInfoSaga(),
    EditProfileSaga(),
    changePasswordSaga()
];
