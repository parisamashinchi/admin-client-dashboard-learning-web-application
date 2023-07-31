import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import loadingAction from "utils/globalRedux/loading/action";

function* get(action) {
  const { name, url, mutateData } = action.payload;
  try {
    yield put(loadingAction(name, true));
    let response = yield call(getRequest, url);
    if (mutateData) {
      response = mutateData(response);
    }
    yield put(actions.setData(name, response));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(name, false));
  }
}
export function* getRequestSaga() {
  yield takeLatest(constants.GET_REQUEST, get);
}

export default [getRequestSaga()];
