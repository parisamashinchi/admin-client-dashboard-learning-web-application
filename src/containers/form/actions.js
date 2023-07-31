import * as constants from "./constants";

export const setGetDataRequest = (name, url, id) => ({
  type: constants.GET_REQUEST,
  payload: {
    name,
    url,
    id,
  },
});
export const setData = (name, data) => ({
  type: constants.SET_DATA,
  payload: {
    name,
    data,
  },
});
export const setAddRequest = (
  name,
  url,
  redirectUrl,
  data,
  doneCallback,
  failCallback
) => ({
  type: constants.ADD_REQUEST,
  payload: {
    name,
    url,
    redirectUrl,
    data,
    doneCallback,
    failCallback,
  },
});
export const setEditRequest = (
  name,
  url,
  redirectUrl,
  id,
  data,
  doneCallback,
  failCallback
) => ({
  type: constants.EDIT_REQUEST,
  payload: {
    name,
    url,
    id,
    data,
    redirectUrl,
    doneCallback,
    failCallback,
  },
});
export const dataLoading = (name, isLoading) => ({
  type: constants.DATA_LOADING,
  payload: {
    name,
    loading: isLoading,
  },
});
export const loading = (name, isLoading) => ({
  type: constants.LOADING,
  payload: {
    name,
    loading: isLoading,
  },
});
export const failure = name => ({
  type: constants.FAILURE,
  payload: {
    name,
  },
});
export const resetState = name => ({
  type: constants.RESET_STATE,
  payload: {
    name,
  },
});
