import * as constants from "./constants";

export const setResetPasswordRequest = (activeCode, password) => ({
  type: constants.RESET_PASSWORD_REQUEST,
  payload: {
    activeCode,
    password
  }
});
