import { all, call, put, takeLatest } from "redux-saga/effects";
import { getRequest, postRequest } from "utils/api/agent";
import * as actions from "./actions";
import * as constants from "./constants";
import { push } from "connected-react-router";
import {  history } from "store";
function* getActiveCourse() {
    try {
        const response = yield call(getRequest, constants.GET_ACTIVE_COURSE_URL);
        yield put(actions.setActiveCourse(response.data));
    } catch (e) {

    }
}
function* getInactiveCourse() {
    try {
        const response = yield call(getRequest, constants.GET_INACTIVE_COURSE_URL);
        yield put(actions.setInactiveCourse(response.data));
    } catch (e) {

    }
}
function* getCompleteCourse() {
    try {
        const response = yield call(getRequest, constants.GET_COMPLETE_COURSE_URL );
        yield put(actions.setCompleteCourse(response.data));
    } catch (e) {

    }
}
function* getCourseDetail(action) {
    const id = action.payload;
    try {
        const response = yield call(getRequest, constants.GET_COURSE_DETAIL_URL + id);
        yield put(actions.setCourseDetail(response.data));

    } catch (e) {

    }
}
function* uploadExerciseCourse(action) {
    const data = action.payload;
    try {
        yield put(actions.loading('upload', true));
         const response = yield call(postRequest, constants.UPLOAD_EXAM_URL, data);
         yield put(actions.setUploadExerciseCourse(response.data));
    } catch (e) {
        console.log(e);
    }finally {
        yield put(actions.loading('upload', false));
    }
}
function* sendExerciseCourse(action) {
    const data = action.payload;
    const name = {
        file_name:data.file_name
    } ;
    try {
        yield put(actions.loading('send', true));
          yield call(postRequest,
         constants.GET_COURSE_DETAIL_URL + data.course_id + "/season/" + data.season_id + "/exam/" + data.exam_id,  name );

    } catch (e) {
        console.log(e);
    }
    finally {
        yield put(actions.loading('send', false));
    }
}

function* seenLesson(action) {
    const data = action.payload;

    const seen_data = {
        "lesson_id":data.lesson_id,
        "lesson_type":data.lesson_type
    }
    try {
        const response = yield call(postRequest, constants.GET_COURSE_DETAIL_URL + data.course_id + "/season/" + data.season_id + "/seen",  seen_data );
        if(response.data.must_refresh === true){
            yield put(actions.getCourseDetail(data.course_id));
        }
    } catch (e) {
        console.log(e);
    }
}

function* createInvoice(action) {
    const data = action.payload;
    try {
        const response = yield call(postRequest, constants.CREATE_INVOICE_URL,  data );
        window.location.href = response.data.url
    } catch (e) {
        console.log(e);
    }
}

function* getVideoUrl(action) {
    const data = action.payload;
    try {
        const response = yield call(getRequest, constants.GET_VIDEO_URL + data.course_id + "/season/" + data.season_id + "/video/" + data.lesson_id );
        yield put(actions.setVideoUrl(response.data));
    } catch (e) {
        console.log(e);
    }
}

function* startExam(action) {
    const data = action.payload;
    try {
        const response = yield call(postRequest,
            constants.GET_COURSE_DETAIL_URL + data.course_id +
            "/season/" + data.season_id +
            "/exam/" + data.exam_id +
            "/start/"
        );
        yield put(actions.setExamTime(response.data));
    } catch (e) {
        console.log(e);
    }
}

function* sendQuestionAnswer(action) {
    const data = action.payload;
    try {
         yield call(postRequest,
            constants.GET_COURSE_DETAIL_URL + data.course_id +
            "/season/" + data.season_id +
            "/exam/" + data.exam_id +
            "/answer_question/question/" + data.question_id  +
            "/option/" + data.option_id
        );
    } catch (e) {
        console.log(e);
    }
}

function* endExam(action) {
    const data = action.payload;
    try {
      const response = yield call(postRequest,
            constants.GET_COURSE_DETAIL_URL + data.course_id +
            "/season/" + data.season_id +
            "/exam/" + data.exam_id +
            "/end"
        );
         yield put(actions.setExamResult(response.data));
        const courseResponse = yield call(getRequest, constants.GET_COURSE_DETAIL_URL + data.course_id );
        yield put(actions.setCourseDetail(courseResponse.data));
    } catch (e) {
        console.log(e);
    }
}

function* acceptRule(action) {
    const data = action.payload;
    try {
       yield call(postRequest, constants.GET_COURSE_DETAIL_URL  + data + '/accept_rule');
    } catch (e) {
        console.log(e);
    }
}
export function* getActiveCourseSaga() {
  yield takeLatest(constants.GET_ACTIVE_COURSE, getActiveCourse);
}
export function* getInactiveCourseSaga() {
    yield takeLatest(constants.GET_INACTIVE_COURSE, getInactiveCourse);
}
export function* getCompleteCourseSaga() {
    yield takeLatest(constants.GET_COMPLETE_COURSE, getCompleteCourse);
}
export function* getCourseDetailSaga() {
    yield takeLatest(constants.GET_COURSE_DETAIL, getCourseDetail);
}
export function* uploadExerciseCourseSaga() {
    yield takeLatest(constants.UPLOAD_EXAM, uploadExerciseCourse);
}
export function* sendExerciseCourseSaga() {
    yield takeLatest(constants.SEND_EXAM, sendExerciseCourse);
}
export function* seenLessonSaga() {
    yield takeLatest(constants.SEEN_LESSON, seenLesson);
}
export function* createInvoiceSaga() {
    yield takeLatest(constants.CREATE_INVOICE, createInvoice);
}
export function* getVideoUrlSaga() {
    yield takeLatest(constants.GET_VIDEO, getVideoUrl);
}
export function* startExamSaga() {
    yield takeLatest(constants.START_EXAM, startExam);
}
export function* sendQuestionAnswerSaga() {
    yield takeLatest(constants.SET_QUESTION_ANSWER, sendQuestionAnswer);
}
export function* endExamSaga() {
    yield takeLatest(constants.END_EXAM, endExam);
}
export function* acceptRuleSaga() {
    yield takeLatest(constants.ACCEPT_RULE, acceptRule);
}

export default [
    getActiveCourseSaga(),
    getInactiveCourseSaga(),
    getCompleteCourseSaga(),
    getCourseDetailSaga(),
    uploadExerciseCourseSaga(),
    sendExerciseCourseSaga(),
    seenLessonSaga(),
    createInvoiceSaga(),
    getVideoUrlSaga(),
    startExamSaga(),
    sendQuestionAnswerSaga(),
    endExamSaga(),
    acceptRuleSaga(),
];
