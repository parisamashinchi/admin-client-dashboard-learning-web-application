import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as constants from './constants';

const initialState = fromJS({});

export default {
    [constants.USER]: createReducer(initialState, {
        [constants.SET]: (state, action) =>
            state.merge({
                ...action.payload.data,
            }),
        [constants.SET_COUNTRY_CODE]: (state, action) =>
            state.merge({
                country:action.payload.data,
            }),
        [constants.SET_PRODUCT_ID]: (state, action) =>
            state.merge({
                product_id:action.payload.data,
            }),
        [constants.SET_PRODUCT_TYPE]: (state, action) =>
            state.merge({
                product_type:action.payload.data,
            }),
        [constants.SET_COUNTRY_BY_FILTER]: (state, action) =>
            state.merge({
                filterCountry:action.payload.data,
            }),
    }),
};
