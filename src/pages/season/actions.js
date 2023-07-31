import * as constants from "./constants";

export const getLessons = () => ({
  type: constants.GET_LESSONS,
});

export const setLessons = data => ({
  type: constants.SET_LESSONS,
  payload: { data }
});

export const getDataByFilter = (filter, type, key) => ({
  type: constants.GET_LESSONS_BY_FILTER,
  payload: {
    filter,
    type,
    key,
  }
});

export const setDataByFilter = data => ({
  type: constants.SET_LESSONS_BY_FILTER,
  payload: { data }
});