import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest, postRequest, putRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import { push, goBack } from "connected-react-router";
import isEmpty from "lodash/isEmpty";

function* get(action) {
  const { id, name, url } = action.payload;
  try {
    yield put(actions.dataLoading(name, true));
    const response = yield call(getRequest, `${url}/${id}`);
    yield put(actions.setData(name, response));
  } catch (e) {
    console.log(e);
    yield put(actions.failure(name));
  } finally {
    yield put(actions.dataLoading(name, false));
  }
}
function* add(action) {
  const {
    name,
    url,
    redirectUrl,
    data,
    doneCallback,
    failCallback,
  } = action.payload;
  try {
    yield put(actions.loading(name, true));
    const response = yield call(postRequest, url, data);
    if (response) {
      yield put(actions.setData(name, response));
    }
    if (doneCallback) {
      doneCallback(response);
    } else if (redirectUrl) {
      yield put(push(redirectUrl));
    }
  } catch (e) {
    console.log(e);
    if (failCallback) {
      failCallback();
    }
    yield put(actions.failure(name));
  } finally {
    yield put(actions.loading(name, false));
  }
}
function* edit(action) {
  const {
    name,
    url,
    id,
    data,
    redirectUrl,
    doneCallback,
    failCallback,
  } = action.payload;
  try {
    yield put(actions.loading(name, true));
    const response = yield call(putRequest, `${url}/${id}`, data);
    if (response) {
      yield put(actions.setData(name, response));
    }
    if (doneCallback) {
      doneCallback(response);
    } else if (redirectUrl) {
      yield put(push(redirectUrl));
    }
  } catch (e) {
    console.log(e);
    if (failCallback) {
      failCallback();
    }
    yield put(actions.failure(name));
  } finally {
    yield put(actions.loading(name, false));
  }
}
export function* getRequestSaga() {
  yield takeLatest(constants.GET_REQUEST, get);
}
export function* addRequestSaga() {
  yield takeLatest(constants.ADD_REQUEST, add);
}
export function* editRequestSaga() {
  yield takeLatest(constants.EDIT_REQUEST, edit);
}

export default [getRequestSaga(), addRequestSaga(), editRequestSaga()];
