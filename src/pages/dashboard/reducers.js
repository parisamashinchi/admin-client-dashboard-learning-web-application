import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
  [constants.DASHBOARD]: createReducer(initialState, {
    [constants.SET_DASHBOARD]: (state, action) =>
      state.merge({
        statistics: action.payload.data.statistics,
        shopStatistics: action.payload.data.shopStatistics,
        mostVisitedProducts: action.payload.data.mostVisitedProducts,
        activities: action.payload.data.activities,
      }),
  }),
};
