import * as constants from "./constants";

export const getCourse = () => ({
    type: constants.GET_COURSE,
});
export const setCourse = data => ({
    type: constants.SET_COURSE,
    payload: { data }
});
export const getSellType = (data) => ({
    type: constants.GET_SELL_TYPE,
    payload: { data }
});
export const setSellType = data => ({
    type: constants.SET_SELL_TYPE,
    payload: { data }
});

export const getDataByFilter = (filter, type, key) => ({
    type: constants.GET_BY_FILTER,
    payload: {
        filter,
        type,
        key,
    }
});

export const setDataByFilter = data => ({
    type: constants.SET_BY_FILTER,
    payload: { data }
});


