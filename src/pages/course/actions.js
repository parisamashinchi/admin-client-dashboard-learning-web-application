import * as constants from "./constants";

export const getData = () => ({
  type: constants.GET_DATA,
});

export const setData = data => ({
  type: constants.SET_DATA,
  payload: { data }
});

export const getDataByFilter = (filter, type, key) => ({
  type: constants.GET_DATA_BY_FILTER,
  payload: {
    filter,
    type,
    key,
  }
});

export const setDataByFilter = data => ({
  type: constants.SET_DATA_BY_FILTER,
  payload: { data }
});

export const scoreExam = data => ({
  type: constants.SCORE_EXAM,
  payload:  data ,
});

export const publishPackage = data => ({
  type: constants.PUBLISH_PACKAGE,
  payload:  data ,
});

export const onPublishPackage = data => ({
  type: constants.ON_PUBLISH_PACKAGE,
  payload:  data ,
});
export const updateUniversityAccess = data => ({
  type: constants.UPDATE_UNIVERSITY_ACCESS,
  payload:  data ,
});



