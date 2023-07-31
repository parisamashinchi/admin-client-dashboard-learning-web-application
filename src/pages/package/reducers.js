import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({
    data: [],
    filtered: [],
});

export default {
  [constants.PACKAGE]: createReducer(initialState, {
      [constants.SET_COURSE]: (state, action) =>
          state.merge({
              courses: action.payload.data,
              teachers: action.payload.data
          }),
      [constants.SET_SELL_TYPE]: (state, action) =>
        state.merge({
            Sell_types: action.payload.data
        }),
          [constants.SET_BY_FILTER]: (state, action) =>
              state.merge({
                  filtered: action.payload.data
              }),
}
)};
