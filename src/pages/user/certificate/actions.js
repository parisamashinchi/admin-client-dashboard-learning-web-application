import * as constants from "./constants";

export const getCertificate = ()  => ({
  type: constants.GET_CERTIFICATES,
});
export const setCertificate = data  => ({
  type: constants.SET_CERTIFICATES,
  payload: data,
});