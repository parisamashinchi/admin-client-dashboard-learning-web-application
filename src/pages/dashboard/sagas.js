import { all, call, put, takeLatest } from "redux-saga/effects";
import { getRequest } from "utils/api/agent";
import * as actions from "./actions";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";

function* getStatistics() {
  try {
    yield put(loadingAction(constants.DASHBOARD, true));
    const response = yield all([
      call(getRequest, constants.STATISTICS_API_URL),
      call(getRequest, constants.SHOP_STATISTICS_API_URL),
      call(getRequest, constants.MOST_VISITED_PRODUCT_API_URL),
      call(getRequest, constants.ACTIVITY_API_URL),
    ]);
    yield put(
      actions.setDashboard({
        statistics: response[0],
        shopStatistics: response[1],
        mostVisitedProducts: response[2],
        activities: response[3].items,
      })
    );
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.DASHBOARD, false));
  }
}
export function* getStatisticsSaga() {
  yield takeLatest(constants.GET_DASHBOARD, getStatistics);
}
export default [getStatisticsSaga()];
