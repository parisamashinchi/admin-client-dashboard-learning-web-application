import { call, put, takeEvery } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as actions from "./actions";
import * as constants from "./constants";
import get from "lodash/get";
import flatArray from "utils/helpers/flatArray";

function* fetchData(action) {
  const { name, url, query } = action.payload;
  try {
    yield put(actions.loading(name, true));
    const response = yield call(getRequest, url, query);
    yield put(
      actions.setDataRequest(name, flatArray(get(response, "items", [])))
    );
  } catch (e) {
    yield put(actions.failure(name));
    console.log(e);
  } finally {
    yield put(actions.loading(name, false));
  }
}
function* fetchDataSaga() {
  yield takeEvery(constants.GET_DATA_REQUEST, fetchData);
}

export default [fetchDataSaga()];
