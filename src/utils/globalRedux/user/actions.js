import * as constants from './constants';

export const setUser = data => ({
    type: constants.SET,
    payload: {
        data,
    },
});
export const setCountryCode = data => ({
    type: constants.SET_COUNTRY_CODE,
    payload: { data }
});

export const setProductId = data => ({
    type: constants.SET_PRODUCT_ID,
    payload: { data }
});
export const setProductType = data => ({
    type: constants.SET_PRODUCT_TYPE,
    payload: { data }
});
export const setCountryByFilter = data => ({
    type: constants.SET_COUNTRY_BY_FILTER,
    payload: { data }
});