import * as constants from "./constants";

export const setEditProfileRequest = data => ({
  type: constants.EDIT_PROFILE,
  payload: {
    data
  }
});
