import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as actions from "./actions";
import * as orderConstants from "../constants";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";

function* getOrder(action) {
  try {
    yield put(loadingAction(orderConstants.ORDER, true));
    const response = yield call(
      getRequest,
      `${orderConstants.API_URL}/${action.payload.id}`
    );
    yield put(actions.setOrder(response));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(orderConstants.ORDER, false));
  }
}
export function* getOrderSaga() {
  yield takeLatest(constants.GET_ORDER, getOrder);
}
export default [getOrderSaga()];
