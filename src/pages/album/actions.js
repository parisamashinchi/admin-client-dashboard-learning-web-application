import * as constants from "./constants";

export const getCourses = () => ({
  type: constants.GET_COURSES,
});

export const setCourses = data => ({
  type: constants.SET_COURSES,
  payload: { data }
});

export const getCoursesByFilter = (filter, type, key) => ({
  type: constants.GET_COURSES_BY_FILTER,
  payload: {
    filter,
    type,
    key,
  }
});

export const setCoursesByFilter = data => ({
  type: constants.SET_COURSES_BY_FILTER,
  payload: { data }
});