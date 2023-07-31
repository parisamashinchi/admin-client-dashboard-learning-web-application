import {call, put, takeLatest} from "redux-saga/effects";
import {postRequest} from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import get from "lodash/get";

function* uploadFile(action) {
    const {name, data, localAssigns, url, onChange} = action.payload;
    yield put(actions.setLocalFiles(name, localAssigns));
    try {
        yield put(actions.loading(name, true));
        const response = yield call(postRequest, url, data);
        yield call(onChange, response.data.file);
        yield put(actions.setUploadedFiles(name, response.data.file));

    } catch (e) {
        console.log(e);
    } finally {
        yield put(actions.loading(name, false));
    }
}

export function* uploadFilesSaga() {
    yield takeLatest(constants.UPLOAD_FILES_REQUEST, uploadFile);
}

export default [uploadFilesSaga()];
