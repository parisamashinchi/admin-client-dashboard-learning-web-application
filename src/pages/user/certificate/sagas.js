import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as actions from "./actions";
import * as constants from "./constants";

function* getCertificate() {
  try {
    const response = yield call(getRequest, constants.GET_CERTIFICATE_URL );
    yield put(actions.setCertificate(response.data));
  } catch (e) {

  }
}
export function* getCertificateSaga() {
  yield takeLatest(constants.GET_CERTIFICATES, getCertificate);
}
export default [getCertificateSaga()];
