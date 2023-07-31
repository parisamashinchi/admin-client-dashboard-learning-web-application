import * as constants from "./constants";

export const getDashboard = () => ({
  type: constants.GET_DASHBOARD,
});
export const setDashboard = data => ({
  type: constants.SET_DASHBOARD,
  payload: { data },
});
