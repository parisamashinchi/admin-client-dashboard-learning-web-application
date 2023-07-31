import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";
import mapKeys from "lodash/mapKeys";

const initialState = fromJS({});

export default {
  [constants.TABLE]: createReducer(initialState, {
    [constants.SET_ALL]: (state, action) =>
      state.merge({
        ...mapKeys(
          action.payload.data,
          (value, key) => action.payload.name + "_" + key
        )
      }),
    [constants.LOADING]: (state, action) =>
      state.merge({
        [action.payload.name + "_loading"]: action.payload.loading
      }),
    [constants.FAILURE]: (state, action) =>
      state.merge({
        [action.payload.name + "_failed"]: true
      }),
      [constants.SET_COURSE_ID]: (state, action) =>
        state.merge({
            courseId: action.payload.id
        }),
  })
};
