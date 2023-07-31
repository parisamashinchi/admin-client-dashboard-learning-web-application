import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest, getRequest } from "utils/api/agent";
import * as constants from "./constants";
import { push } from "connected-react-router";
import { routes as privateRoutes } from "router/private";
import loadingAction from "utils/globalRedux/loading/action";
import * as userAction from "utils/globalRedux/user/actions";
import { updateLocalStorage } from "utils/localStorage";
import { asyncRemoveLocalStorageAction, flush } from "utils/middlewares/redux";

function* login(action) {
  const { data } = action.payload;
  try {
    yield put(loadingAction(constants.LOGIN, true));
    const code = yield call(postRequest, constants.API_URL, data);
    const response = yield call(postRequest, constants.VERIFY_URL, Object.assign(code.data, {sms_code: 1912, type: 'login'}));
    yield put(userAction.setUser(response));
    yield call(updateLocalStorage);
    yield put(push(privateRoutes.ROUTE_DASHBOARD));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.LOGIN, false));
  }
}

function* logout() {
  try {
    yield call(getRequest, constants.CMS_LOGOUT_URL);
    yield put(loadingAction(constants.LOGOUT, true));
    yield put(asyncRemoveLocalStorageAction());
    yield put(flush());
    yield put(push("/auth/sign-in"));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.LOGOUT, false));
  }
}

export function* loginRequestSaga() {
  yield takeLatest(constants.LOGIN_REQUEST, login);
}

export function* logoutRequestSaga() {
  yield takeLatest(constants.LOGOUT_REQUEST, logout);
}

export default [loginRequestSaga(), logoutRequestSaga()];
