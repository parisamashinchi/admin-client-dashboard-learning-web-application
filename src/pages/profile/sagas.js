import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest, putRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as userActions from "utils/globalRedux/user/actions";
import loadingAction from "utils/globalRedux/loading/action";

function* editProfile(action) {
  const { data } = action.payload;
  try {
    yield put(loadingAction(constants.PROFILE, true));
    yield call(putRequest, constants.API_URL, data);
    const response = yield call(getRequest, constants.API_URL, data);
    yield put(userActions.setUser(response));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.PROFILE, false));
  }
}
export function* editProfileSaga() {
  yield takeLatest(constants.EDIT_PROFILE, editProfile);
}
export default [editProfileSaga()];
