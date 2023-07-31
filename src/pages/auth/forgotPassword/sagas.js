import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as actions from "./actions";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import { message } from "antd";

function* forgotPassword(action) {
  const { data } = action.payload;
  try {
    yield put(actions.setForgotPasswordStatus(constants.FORGOT_PASSWORD_IDLE));
    yield put(loadingAction(constants.FORGOT_PASSWORD, true));
    const response = yield call(postRequest, constants.API_URL, data);
    message.success(response.data);
    yield put(actions.setForgotPasswordStatus(constants.FORGOT_PASSWORD_SENT));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(loadingAction(constants.FORGOT_PASSWORD, false));
  }
}
export function* forgotPasswordRequestSaga() {
  yield takeLatest(constants.FORGOT_PASSWORD_REQUEST, forgotPassword);
}
export default [forgotPasswordRequestSaga()];
