import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({
    data: [],
    filtered: [],
});
export default {
  [constants.LESSONS]: createReducer(initialState, {
    [constants.SET_LESSONS]: (state, action) =>
      state.merge({
        data: action.payload.data
      }),
      [constants.SET_LESSONS_BY_FILTER]: (state, action) =>
          state.merge({
              filtered: action.payload.data
          }),
  })
};
