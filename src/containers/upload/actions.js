import * as constants from "./constants";

export const setUploadRequest = (name, data, localAssigns, url, onChange) => ({
  type: constants.UPLOAD_FILES_REQUEST,
  payload: {
    name,
    data,
    localAssigns,
    url,
    onChange,
  }
});
export const setLocalFiles = (name, data) => ({
  type: constants.SET_LOCAL_FILES,
  payload: {
    name,
    data
  }
});
export const setUploadedFiles = (name, data) => ({
  type: constants.SET_UPLOADED_FILES,
  payload: {
    name,
    data
  }
});
export const setDeleteFile = (name, id) => ({
  type: constants.DELETE_FILE,
  payload: {
    name,
    id
  }
});
export const loading = (name, isLoading) => ({
  type: constants.LOADING,
  payload: {
    name,
    loading: isLoading
  }
});
export const failure = name => ({
  type: constants.FAILURE,
  payload: {
    name
  }
});
export const resetState = name => ({
  type: constants.RESET_STATE,
  payload: {
    name
  }
});