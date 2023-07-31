import * as constants from "./constants";

export const getDataRequest = (name, url, query) => ({
  type: constants.GET_DATA_REQUEST,
  payload: {
    name,
    url,
    query
  }
});
export const setDataRequest = (name, data, url) => ({
  type: constants.SET_DATA_REQUEST,
  payload: {
    name,
    data,
    url
  }
});
export const failure = name => ({
  type: constants.FAILURE,
  payload: {
    name
  }
});
export const loading = (name, isLoading) => ({
  type: constants.LOADING,
  payload: {
    name,
    loading: isLoading
  }
});
