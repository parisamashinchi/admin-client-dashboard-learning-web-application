import * as constants from "./constants";

export const getCommentData = () => ({
    type: constants.GET_COMMENT_DATA,
});

export const setCommentData = data => ({
    type: constants.SET_COMMENT_DATA,
    payload: { data }
});

export const getDataCommentByFilter = (filter, type, key) => ({
    type: constants.GET_DATA_COMMENT_BY_FILTER,
    payload: {
        filter,
        type,
        key,
    }
});

export const setDataCommentByFilter = data => ({
    type: constants.SET_DATA_COMMENT_BY_FILTER,
    payload: { data }
});