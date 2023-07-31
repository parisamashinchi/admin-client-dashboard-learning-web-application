import * as constants from "./constants";

export const failure = name => ({
  type: constants.FAILURE,
  payload: {
    name
  }
});
export const getPage = (name, url, query) => ({
  type: constants.GET_PAGE,
  payload: {
    name,
    url,
    query
  }
});
export const setAll = (name, data, url) => ({
  type: constants.SET_ALL,
  payload: {
    name,
    data,
    url
  }
});
export const remove = (name, url, id) => ({
  type: constants.REMOVE,
  payload: {
    name,
    id,
    url
  }
});
export const loading = (name, isLoading) => ({
  type: constants.LOADING,
  payload: {
    name,
    loading: isLoading
  }
});
export const setCourseId = id => ({
  type: constants.SET_COURSE_ID,
  payload: { id }
});
