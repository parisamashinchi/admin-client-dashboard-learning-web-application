import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
  [constants.DYNAMIC_REPEATER]: createReducer(initialState, {
    [constants.SET_DATA]: (state, action) =>
      state.merge({ [`${action.payload.name}_data`]: action.payload.data }),
    [constants.RESET_STATE]: (state, action) =>
      state.merge({
        [`${action.payload.name}_data`]: undefined,
      }),
  }),
};
