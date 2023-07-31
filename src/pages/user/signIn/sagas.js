import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest, getRequest } from "utils/api/agent";
import * as constants from "./constants";
import { push } from "connected-react-router";
import { routes as privateRoutes } from "router/private";
import { routes as publicRoutes } from "router";
import loadingAction from "utils/globalRedux/loading/action";
import * as userAction from "utils/globalRedux/user/actions";
import { updateLocalStorage } from "utils/localStorage";

function* signUp(action) {
  const { data } = action.payload;
  try {
    const response = yield call(postRequest, constants.SIGN_UP_URL, data);
    const newData = {
      validation_code: response.data.validation_code,
      auth: 'signUp',
      mobile_number: data.mobile_number
    }
    yield put(userAction.setUser(newData));
    yield call(updateLocalStorage);
  } catch (e) {
  } finally {
  }
}
function* verifyNumberRequest(action) {
  const { data , response} = action.payload;

  try {
    // const response = yield call(postRequest, constants.VERIFY_NUM_REQUEST_URL, data);
    yield put(userAction.setUser(response.data));
    yield call(updateLocalStorage);
    if(response.data.data.role ==="STUDENT-PROFILE"){
      if(data.product_id !== null) {
        if (data.type === "login") {
          yield put(push(privateRoutes.ROUTE_USER_DASHBOARD + "?before_state=login&after_state=gateway"));
        } else {
          yield put(push(privateRoutes.ROUTE_USER_DASHBOARD + "?before_state=signUp&after_state=gateway"));
        }
      } else {
        if (data.type === "login") {
          yield put(push(privateRoutes.ROUTE_USER_DASHBOARD + "?before_state=login&after_state=none"));
        } else {
          yield put(push(privateRoutes.ROUTE_USER_DASHBOARD + "?before_state=signUp&after_state=none"));
        }
      }
    } else if(response.data.data.role ==="ADMIN-PROFILE" ||response.data.role === 'view'){
      yield put(push(privateRoutes.ROUTE_DASHBOARD));
    } else if(response.data.data.role ==="university"){
      yield put(push(privateRoutes.ROUTE_USER_UNIVERSITY));
    }else if(response.data.data.role ==="marketing") {
      yield put(push(privateRoutes.ROUTE_USER_UNIVERSITY));
    }
  } catch (e) {
   
  } finally {
  }
}

function* signIn(action) {
  const { data } = action.payload;
  try {
    yield put(loadingAction(constants.LOGIN_REQUEST, true));
    const response = yield call(postRequest, constants.API_URL, data);
    const newData = {
      validation_code: response.data.validation_code,
      auth: 'signIn',
      mobile_number: data.mobile_number
    }
     yield put(userAction.setUser( newData ));
  } catch (e) {
 
  } finally {
     yield put(loadingAction(constants.LOGIN_REQUEST, false));
  }
}

function* getCountryCode() {
  try {
    const response = yield call(getRequest, constants.COUNTRY_CODE_URL);
    yield put(userAction.setCountryCode( response.data ));
  } catch (e) {
    
  } finally {
  }
}
function* getCountryByFilter(action) {
  const {filter,type, key} = action.payload;
  try {
    // yield put(loadingAction(constants.COURSE_DATA, true));
    const response = yield call(getRequest, constants[`COUNTRY_CODE_URL`], {[key]: filter, limit: 200});
    // yield put(userAction.setCountryByFilter(response.data));
    yield put(userAction.setCountryByFilter({
      [type]: response.data,
    }));
  } catch (e) {
    console.log(e);
  } finally {
    // yield put(loadingAction(constants.COURSE_DATA, false));
  }
}

export function* signUpRequestSaga() {
  yield takeLatest(constants.SIGN_UP_REQUEST, signUp);
}
export function* verifyNumberRequestSaga() {
  yield takeLatest(constants.VERIFY_NUM_REQUEST, verifyNumberRequest);
}
export function* signInRequestSaga() {
  yield takeLatest(constants.LOGIN_REQUEST, signIn);
}
export function* getCountryCodeSaga() {
  yield takeLatest(constants.GET_COUNTRY_CODE, getCountryCode);
}
export function* getCountryByFilterSaga() {
  yield takeLatest(constants.GET_COUNTRY_BY_FILTER, getCountryByFilter);
}
export default [
    signUpRequestSaga(),
    verifyNumberRequestSaga(),
    signInRequestSaga(),
    getCountryCodeSaga(),
    getCountryByFilterSaga(),
];
