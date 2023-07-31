import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({
    data: [],
    filtered: [],
});

export default {
  [constants.DISCOUNT]: createReducer(initialState, {
    [constants.SET_STUDENTS]: (state, action) =>
      state.merge({
        data: action.payload.data
      }),
      [constants.SET_STUDENTS_BY_FILTER]: (state, action) =>
          state.merge({
              filtered: action.payload.data
          }),
  })
};
