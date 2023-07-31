import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({
    data: [],
    filtered: [],
});

export default {
  [constants.EXAM]: createReducer(initialState, {
    [constants.SET_QUESTIONS]: (state, action) =>
      state.merge({
        data: action.payload.data
      }),
      [constants.SET_QUESTIONS_BY_FILTER]: (state, action) =>
          state.merge({
              filtered: action.payload.data
          }),
  })
};
