import * as constants from "./constants";

export const getQuestion = () => ({
  type: constants.GET_QUESTIONS,
});

export const setQuestion = data => ({
  type: constants.SET_QUESTIONS,
  payload: { data }
});

export const getQuestionByFilter = (filter, type, key) => ({
  type: constants.GET_QUESTIONS_BY_FILTER,
  payload: {
    filter,
    type,
    key,
  }
});

export const setQuestionByFilter = data => ({
  type: constants.SET_QUESTIONS_BY_FILTER,
  payload: { data }
});