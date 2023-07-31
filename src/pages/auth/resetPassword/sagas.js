import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import { push } from "connected-react-router";
import { message } from "antd";
import { routes as publicRoutes } from "router";

function* resetPassword(action) {
  try {
    yield put(loadingAction(constants.RESET_PASSWORD, true));
    const response = yield call(postRequest, constants.API_URL, action.payload);
    yield put(message.success(response.data));
    yield put(push(publicRoutes.ROUTE_AUTH_SIGN_IN));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(loadingAction(constants.RESET_PASSWORD, false));
  }
}

export function* resetPasswordSaga() {
  yield takeLatest(constants.RESET_PASSWORD_REQUEST, resetPassword);
}

export default [resetPasswordSaga()];
