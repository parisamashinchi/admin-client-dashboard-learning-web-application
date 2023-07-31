import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
  [constants.USER_DASHBOARD]: createReducer(initialState, {
    [constants.SET_RECOMMENDED]: (state, action) =>
      state.merge({
       recommended: action.payload,
      }),
      [constants.SET_VALIDATE_SELL_TYPE]: (state, action) =>
          state.merge({
              validateSell: action.payload,
          }),
      [constants.SET_CREATE_INVOICE]: (state, action) =>
          state.merge({
              createInvoice: action.payload,
          }),
  }),
};
