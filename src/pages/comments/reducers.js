import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({
    data: [],
    filtered: [],
});

export default {
    [constants.COMMENTS]: createReducer(initialState, {
        [constants.SET_COMMENT_DATA]: (state, action) =>
            state.merge({
                data: action.payload
            }),
        [constants.SET_DATA_COMMENT_BY_FILTER]: (state, action) =>
            state.merge({
                filtered: action.payload.data
            }),

    })
};