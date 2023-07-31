import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as constants from './constants';

const initialState = fromJS({});

export default {
    [constants.PROFILE]: createReducer(initialState, {
        [constants.SET_PROFILE_INFO]: (state, action) =>
            state.merge({
                info: action.payload.data,
            }),
    }),
};
