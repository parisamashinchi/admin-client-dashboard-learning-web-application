import * as constants from "./constants";

export const getStudents = () => ({
  type: constants.GET_STUDENTS,
});

export const setStudents = data => ({
  type: constants.SET_STUDENTS,
  payload: { data }
});

export const getStudentsByFilter = (filter, type, key) => ({
  type: constants.GET_STUDENTS_BY_FILTER,
  payload: {
    filter,
    type,
    key,
  }
});

export const setStudentsByFilter = data => ({
  type: constants.SET_STUDENTS_BY_FILTER,
  payload: { data }
});