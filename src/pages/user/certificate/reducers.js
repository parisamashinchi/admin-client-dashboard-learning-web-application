import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
    [constants.CERTIFICATES]: createReducer(initialState, {
      [constants.SET_CERTIFICATES]: (state, action) =>
          state.merge({
              certificates: action.payload,
      }),
  }),
};
