import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";
import * as constants from "./constants";
import config from "src/config";

const initialState = fromJS({
  locale: config.locale
});

export default {
  [constants.SETTING]: createReducer(initialState, {
    [constants.SET]: (state, action) =>
      state.merge({
        ...action.payload.data
      })
  })
};
