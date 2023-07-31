import * as constants from "./constants";

export const getOrder = id => ({
  type: constants.GET_ORDER,
  payload: { id },
});
export const setOrder = data => ({
  type: constants.SET_ORDER,
  payload: { data },
});
