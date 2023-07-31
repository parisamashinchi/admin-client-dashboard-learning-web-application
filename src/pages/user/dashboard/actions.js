import * as constants from "./constants";

export const getRecommended = ()  => ({
    type: constants.GET_RECOMMENDED,
});

export const setRecommended = data => ({
    type: constants.SET_RECOMMENDED,
    payload: data,
});

export const getCourseListURL = data => ({
    type: constants.GET_COURSE_LIST_URL,
    payload: data,
});

export const validateSellType = data => ({
    type: constants.VALIDATE_SELL_TYPE,
    payload: data,
});

export const setValidateSellType = data => ({
    type: constants.SET_VALIDATE_SELL_TYPE,
    payload: data,
});

export const createInvoice = data => ({
    type: constants.CREATE_INVOICE_DASH,
    payload: data,
});
export const setCreateInvoice = data => ({
    type: constants.SET_CREATE_INVOICE,
    payload: data,
});
