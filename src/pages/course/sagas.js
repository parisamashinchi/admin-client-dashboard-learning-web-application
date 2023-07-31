import { call, put, takeLatest } from "redux-saga/effects";
import { getRequest , postRequest, putRequest} from "utils/api/agent";
import * as constants from "./constants";
import loadingAction from "utils/globalRedux/loading/action";
import * as actions from "./actions";


function* getData() {
  try {
    yield put(loadingAction(constants.COURSE_DATA, true));
    const tags = yield call(getRequest, constants.TAGS_URL, {limit: 200});
    const faqs = yield call(getRequest, constants.FAQS_URL, {limit: 200});
    const properties = yield call(getRequest, constants.PROPERTIES_URL, {limit: 200, 'filter[is_published]': 1});
    const seasons = yield call(getRequest, constants.SEASONS_URL, {limit: 200, 'filter[is_published]': 1});
    const courses = yield call(getRequest, constants.COURSE_URL, {limit: 200, 'filter[is_published]': 1});
    const teacher = yield call(getRequest, constants.TEACHER_URL, {limit: 200});
    const category = yield call(getRequest, constants.CATEGORY_URL, {limit: 200});
    yield put(actions.setData({
        TAGS: tags.data,
        FAQS: faqs.data,
        PROPERTIES: properties.data,
        SEASONS: seasons.data,
        COURSE: courses.data,
        TEACHER: teacher.data,
        CATEGORY: category.data,
    }));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.COURSE_DATA, false));
  }
}

function* getDataByFilter(action) {
    const {filter, type, key} = action.payload;
  try {
    yield put(loadingAction(constants.COURSE_DATA, true));
    const response = yield call(getRequest, constants[`${type}_URL`], {[key]: filter, limit: 200});
    yield put(actions.setDataByFilter({
        [type]: response.data,
    }));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(loadingAction(constants.COURSE_DATA, false));
  }
}
function* scoreExam(action) {
    const {score, course_id , student_id, season_id, exam_id} = action.payload;;
    const data = {
        score: score
    }
    try {
        yield put(loadingAction(constants.COURSE_DATA, true));
        yield call(postRequest,
        constants.COURSE_URL+ '/' +  course_id + "/student_profile/" + student_id + '/season/' +  season_id  + '/exam/' + exam_id,
            data);

    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.COURSE_DATA, false));
    }
}
function* publishPackage(action) {
    const {package_id, course_id} = action.payload;
    try {
        yield put(loadingAction(constants.COURSE_DATA, true));
        yield call(putRequest,
            constants.COURSE_URL+ '/' +  course_id + "/package/" + package_id + '/publish/');
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.COURSE_DATA, false));
    }
}

function* onPublishPackage(action) {
    const {package_id, course_id} = action.payload;
    try {
        yield put(loadingAction(constants.COURSE_DATA, true));
        yield call(putRequest,
            constants.COURSE_URL+ '/' +  course_id + "/package/" + package_id + '/onpublish/');
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.COURSE_DATA, false));
    }
}
function* updateUniversityAccess(action) {
    const {student_id, course_id, university_access} = action.payload;
    console.log(student_id, course_id)
    const data = {
        university_access: university_access
    }
    try {
        yield put(loadingAction(constants.COURSE_DATA, true));
        yield call(postRequest,
            constants.COURSE_URL+ '/' +  course_id + "/student_profile/update_university_access/" + student_id , data);
    } catch (e) {
        console.log(e);
    } finally {
        yield put(loadingAction(constants.COURSE_DATA, false));
    }
}

export function* getDataSaga() {
  yield takeLatest(constants.GET_DATA, getData);
}

export function* getDataByFilterSaga() {
  yield takeLatest(constants.GET_DATA_BY_FILTER, getDataByFilter);
}

export function* scoreExamSaga() {
    yield takeLatest(constants.SCORE_EXAM, scoreExam);
}
export function* publishPackageSaga() {
    yield takeLatest(constants.PUBLISH_PACKAGE, publishPackage);
}
export function* onPublishPackageSaga() {
    yield takeLatest(constants.ON_PUBLISH_PACKAGE, onPublishPackage);
}
export function* updateUniversityAccessSaga() {
    yield takeLatest(constants.UPDATE_UNIVERSITY_ACCESS, updateUniversityAccess);
}

export default [
    getDataSaga(),
    getDataByFilterSaga(),
    scoreExamSaga(),
    publishPackageSaga(),
    onPublishPackageSaga(),
    updateUniversityAccessSaga()
];
