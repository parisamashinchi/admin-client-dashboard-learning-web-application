import * as constants from "./constants";

export const setGetDataRequest = (name, url, mutateData) => ({
  type: constants.GET_REQUEST,
  payload: {
    name,
    url,
    mutateData,
  },
});
export const setData = (name, data) => ({
  type: constants.SET_DATA,
  payload: {
    name,
    data,
  },
});
export const resetState = name => ({
  type: constants.RESET_STATE,
  payload: {
    name,
  },
});
