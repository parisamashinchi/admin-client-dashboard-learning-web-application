import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
  [constants.SELECTOR]: createReducer(initialState, {
    [constants.SET_DATA_REQUEST]: (state, action) =>
      state.merge({
        [action.payload.name]: action.payload.data
      }),
    [constants.LOADING]: (state, action) =>
      state.merge({
        [`${action.payload.name}_loading`]: action.payload.loading
      }),
    [constants.FAILURE]: (state, action) =>
      state.merge({
        [`${action.payload.name}_failed`]: true
      })
  })
};
