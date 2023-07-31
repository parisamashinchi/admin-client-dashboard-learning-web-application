import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({
    data: [],
    filtered: [],
});

export default {
  [constants.DEPARTMENT]: createReducer(initialState, {
    [constants.SET_COURSES]: (state, action) =>
      state.merge({
        data: action.payload.data
      }),
      [constants.SET_COURSES_BY_FILTER]: (state, action) =>
          state.merge({
              filtered: action.payload.data
          }),
  })
};
