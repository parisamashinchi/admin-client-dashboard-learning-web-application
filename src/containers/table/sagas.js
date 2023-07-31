import { call, put, takeLatest, select } from "redux-saga/effects";
import { deleteRequest, getRequest } from "utils/api/agent";
import _ from "lodash";
import * as actions from "./actions";
import * as constants from "./constants";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";

const isFetchPageAction = action => action.type.endsWith(constants.GET_PAGE);
const isRemoveAction = action => action.type.endsWith(constants.REMOVE);

const getCurrentPageAndSize = (state, name) => ({
  page: state.getIn(
    [constants.TABLE, name + "_meta", "current_page"],
    constants.DEFAULT_PAGE_NUMBER
  ),
  limit: state.getIn(
    [constants.TABLE, name + "_meta", "per_page"],
    constants.DEFAULT_PAGE_SIZE
  )
});

const getLatestQuery = (state, name) =>
  omit(state.getIn([constants.TABLE, name + "_meta"], {}), [
    "current_page",
    "total",
    "per_page",
    "total"
  ]);

function* fetchPage(action) {
  const { name, url, query: newQuery } = action.payload;

  try {
    yield put(actions.loading(name, true));
    const pageAndSize = _.pickBy(
      yield select(getCurrentPageAndSize, name),
      value => value !== undefined
    );
    const latestQuery = _.pickBy(
      yield select(getLatestQuery, name),
      value => value !== undefined
    );
    const query = newQuery ? newQuery : latestQuery;
    let data;
    console.log(name)
    if(newQuery.hasOwnProperty('query')) {
      if (name === 'COURSE' || name === 'PACKAGE') {
        data = yield call(getRequest, url, {'filter[header_title]': newQuery.query, limit: 200});
      } else if (name === 'TAG') {
        data = yield call(getRequest, url, {'filter[tag_name]': newQuery.query, limit: 200});
      } else if (name === 'TEACHER') {
        data = yield call(getRequest, url, {'filter[name]': newQuery.query, limit: 200});
      } else if (name === 'DISCOUNT') {
        data = yield call(getRequest, url, {'filter[code]': newQuery.query, limit: 200});
      } else if (name === 'STUDENT') {
        data = yield call(getRequest, url, {'mobile_number': newQuery.query, limit: 200});
      } else {
        data = yield call(getRequest, url, {'filter[title]': newQuery.query, limit: 200});
      }
    } else {
      console.log('here')
      data = yield call(getRequest, url, {
        ...pageAndSize,
        ...query
      });
    }
    Object.assign(data.meta, omit(data, ["meta"]));
    yield put(actions.setAll(name, data));
  } catch (e) {
    yield put(actions.failure(name));
    console.log(e);
  } finally {
    yield put(actions.loading(name, false));
  }
}

function* remove(action) {
  const { url, name, id } = action.payload;
  try {
    yield put(actions.loading(name, true));
    yield call(deleteRequest, `${url}/${id}`);
    yield put(actions.getPage(name, url, 1));
  } catch (e) {
  } finally {
    yield put(actions.loading(name, false));
  }
}

function* getPageSaga() {
  yield takeLatest(isFetchPageAction, fetchPage);
}
function* removeSaga() {
  yield takeLatest(isRemoveAction, remove);
}

export default [getPageSaga(), removeSaga()];
