import * as constants from "./constants";

export const setSetting = data => ({
  type: constants.SET,
  payload: {
    data
  }
});
