import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as userAction from "utils/globalRedux/user/actions";
import { updateLocalStorage } from "utils/localStorage";
import {push} from "connected-react-router";


function* getMe() {
  try {
    yield put(loadingAction(constants.ME, true));
    const response = yield call(getRequest, constants.API_URL);
    yield call(updateLocalStorage);
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.ME, false));
  }
}

export function* getMeRequestSaga() {
  yield takeLatest(constants.GET_ME_REQUEST, getMe);
}

export default [getMeRequestSaga()];
