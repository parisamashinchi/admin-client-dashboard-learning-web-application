import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
  [constants.FORM]: createReducer(initialState, {
    [constants.SET_DATA]: (state, action) =>
      state.merge({ [`${action.payload.name}_data`]: action.payload.data }),
    [constants.DATA_LOADING]: (state, action) =>
      state.merge({
        [`${action.payload.name}_data_loading`]: action.payload.loading
      }),
    [constants.LOADING]: (state, action) =>
      state.merge({
        [`${action.payload.name}_loading`]: action.payload.loading
      }),
    [constants.FAILURE]: (state, action) =>
      state.merge({
        [`${action.payload.name}_failed`]: true
      }),
    [constants.RESET_STATE]: (state, action) =>
      state.merge({
        [`${action.payload.name}_data`]: undefined,
        [`${action.payload.name}_data_loading`]: false,
        [`${action.payload.name}_loading`]: false,
        [`${action.payload.name}_failed`]: false
      })
  })
};
