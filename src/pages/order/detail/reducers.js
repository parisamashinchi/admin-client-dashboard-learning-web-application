import * as orderConstants from "../constants";
import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
  [orderConstants.ORDER]: createReducer(initialState, {
    [constants.SET_ORDER]: (state, action) =>
      state.merge({
        order: action.payload.data,
      }),
  }),
};
