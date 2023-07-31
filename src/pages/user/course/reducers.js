import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default {
    [constants.COURSE]: createReducer(initialState, {
        [constants.LOADING]: (state, action) =>
            state.merge({
                [`${action.payload.name}_loading`]: action.payload.loading
            }),
      [constants.SET_ACTIVE_COURSE]: (state, action) =>
          state.merge({
              active: action.payload,
      }),
      [constants.SET_INACTIVE_COURSE]: (state, action) =>
          state.merge({
              inactive: action.payload,
          }),
      [constants.SET_COMPLETE_COURSE]: (state, action) =>
          state.merge({
              completed: action.payload,
          }),
      [constants.SET_COURSE_DETAIL]: (state, action) =>
          state.merge({
              course_detail: action.payload,
          }),
      [constants.SET_LESSON_DETAIL]: (state, action) =>
          state.merge({
              lesson_detail: action.payload,
       }),
      [constants.SET_SEASON_DETAIL]: (state, action) =>
          state.merge({
              season_detail: action.payload,
      }),
      [constants.SET_UPLOAD_EXAM]: (state, action) =>
          state.merge({
              upload_exam: action.payload,
              uploaded: true
      }),
      [constants.SET_VIDEO]: (state, action) =>
            state.merge({
                video: action.payload,
      }),
      [constants.SET_EXAM_TIME]: (state, action) =>
            state.merge({
                exam_time: action.payload,
      }),
       [constants.SET_EXAM_RESULT]: (state, action) =>
            state.merge({
                exam_result: action.payload,
            }),
  }),
};
