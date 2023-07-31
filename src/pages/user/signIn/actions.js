import * as constants from "./constants";

export const signUp = data => ({
  type: constants.SIGN_UP_REQUEST,
  payload: { data }
});

export const signIn = data => ({
  type: constants.LOGIN_REQUEST,
  payload: { data }
});

export const verifyNumberRequest = (data, response) => ({
  type: constants.VERIFY_NUM_REQUEST,
  payload: { data, response }
});

export const getCountryCode = () => ({
  type: constants.GET_COUNTRY_CODE,
});

export const getCountryByFilter = (filter, type, key) => ({
  type: constants.GET_COUNTRY_BY_FILTER,
  payload: {
    filter,
    type,
    key,
  }
});