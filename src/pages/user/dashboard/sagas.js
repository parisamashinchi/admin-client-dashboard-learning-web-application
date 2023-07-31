import { all, call, put, takeLatest } from "redux-saga/effects";
import { getRequest , postRequest} from "utils/api/agent";
import * as actions from "./actions";
import * as constants from "./constants";
import { updateLocalStorage } from "utils/localStorage";

function* getRecommended() {
   try {
        const response = yield call(getRequest, constants.GET_RECOMMENDED_URL);
        yield put(actions.setRecommended(response.data));
        yield call(updateLocalStorage);
    } catch (e) {
   
    }
}

function* getCourseListURL(action) {
    const course_id =  action.payload;
    if( action.payload.id === 0){
        try {
            const response = yield call(getRequest, constants.GET_COURSE_LIST_URL_URL);
             window.location.href =( `${response.data.url}`);
             // window.location.href =( `${response.data.url}?${response.data.hash}`);
        } catch (e) {
        }
    } else {
        try {
            const response = yield call(getRequest, constants.GET_COURSE_LIST_URL_URL);
            console.log(response.data.course_detail_url)
              // window.location.href =( `${response.data.course_detail_url}${course_id.id}`);
             // window.location.href =( `${response.data.course_detail_url}${course_id.id}?${response.data.hash}`);
        } catch (e) {
        }
    }
}
function* validateSellType(action) {
    const { data } = action.payload;
    try {
        const response = yield call(postRequest, constants.VALIDATE_SELL_TYPE_URL, data);
        yield put(actions.setValidateSellType(response.data));
    } catch (e) {
   
    }
}
function* createInvoice(action) {
    try {
        const response = yield call(postRequest, constants.CREATE_INVOICE_URL, action.payload);
         yield put(actions.setCreateInvoice(response.data));
    } catch (e) {
     
    }
}
export function* getRecommendedSaga() {
    yield takeLatest(constants.GET_RECOMMENDED, getRecommended);
}

export function* getCourseListURLSaga() {
    yield takeLatest(constants.GET_COURSE_LIST_URL, getCourseListURL);
}

export function* validateSellTypeSaga() {
    yield takeLatest(constants.VALIDATE_SELL_TYPE, validateSellType);
}
export function* createInvoiceSaga() {
    yield takeLatest(constants.CREATE_INVOICE_DASH, createInvoice);
}
export default [
    getRecommendedSaga(),
    getCourseListURLSaga(),
    validateSellTypeSaga(),
    createInvoiceSaga(),
];
