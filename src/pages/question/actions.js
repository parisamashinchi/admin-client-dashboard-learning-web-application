import * as constants from "./constants";

export const getCourse = () => ({
    type: constants.GET_COURSE,
});
export const setCourse = data => ({
    type: constants.SET_COURSE,
    payload: { data }
});



