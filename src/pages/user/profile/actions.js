import * as constants from "./constants";

export const getProfileInfo = ()  => ({
    type: constants.GET_PROFILE_INFO,
});

export const EditProfile = data => ({
      type: constants.EDIT_PROFILE,
      payload: data
});
export const setProfileInfo = data => ({
    type: constants.SET_PROFILE_INFO,
    payload: data,
});
export const changePassword = data => ({
    type: constants.CHANGE_PASSWORD,
    payload: data,
});


