import * as constants from "./constants";

export const loading = (name, isLoading) => ({
    type: constants.LOADING,
    payload: {
        name,
        loading: isLoading,
    },
});
export const getActiveCourse = ()  => ({
  type: constants.GET_ACTIVE_COURSE,
});
export const setActiveCourse = data  => ({
    type: constants.SET_ACTIVE_COURSE,
    payload: data,
});

export const getInactiveCourse = ()  => ({
    type: constants.GET_INACTIVE_COURSE,
});
export const setInactiveCourse = data  => ({
    type: constants.SET_INACTIVE_COURSE,
    payload:  data ,
});

export const getCompleteCourse = ()  => ({
    type: constants.GET_COMPLETE_COURSE,
});
export const setCompleteCourse = data  => ({
    type: constants.SET_COMPLETE_COURSE,
    payload: data ,
});

export const getCourseDetail = id  => ({
    type: constants.GET_COURSE_DETAIL,
    payload: id ,
});
export const setCourseDetail = data  => ({
    type: constants.SET_COURSE_DETAIL,
    payload:  data ,
});

export const setLessonDetail = data  => ({
    type: constants.SET_LESSON_DETAIL,
    payload:  data ,
});
export const setSeasonDetail = data  => ({
    type: constants.SET_SEASON_DETAIL,
    payload:  data ,
});
export const uploadExerciseCourse = data  => ({
    type: constants.UPLOAD_EXAM,
    payload:  data ,
});
export const setUploadExerciseCourse = data  => ({
    type: constants.SET_UPLOAD_EXAM,
    payload:  data ,
});
export const sendExerciseCourse = data  => ({
    type: constants.SEND_EXAM,
    payload:  data ,
});
export const seenLesson = data  => ({
    type: constants.SEEN_LESSON,
    payload:  data ,
});
export const createInvoice = data  => ({
    type: constants.CREATE_INVOICE,
    payload:  data ,
});
export const getVideoUrl = data  => ({
    type: constants.GET_VIDEO,
    payload:  data ,
});
export const setVideoUrl = data  => ({
    type: constants.SET_VIDEO,
    payload:  data ,
});

export const startExam = data  => ({
    type: constants.START_EXAM,
    payload:  data ,
});
export const setExamTime = data  => ({
    type: constants.SET_EXAM_TIME,
    payload:  data ,
});

export const sendQuestionAnswer = data  => ({
    type: constants.SET_QUESTION_ANSWER,
    payload:  data ,
});

export const endExam = data  => ({
    type: constants.END_EXAM,
    payload:  data ,
});
export const setExamResult = data  => ({
    type: constants.SET_EXAM_RESULT,
    payload:  data ,
});
export const acceptRule = data  => ({
    type: constants.ACCEPT_RULE,
    payload:  data ,
});
