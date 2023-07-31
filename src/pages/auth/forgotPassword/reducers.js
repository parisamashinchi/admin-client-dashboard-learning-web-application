import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
  [constants.FORGOT_PASSWORD]: createReducer(initialState, {
    [constants.FORGOT_PASSWORD_STATUS]: (state, action) =>
      state.merge({
        ["status"]: action.payload.status
      })
  })
};
