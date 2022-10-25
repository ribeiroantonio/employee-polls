import {
  RETRIEVE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RETRIEVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION:
      return {
        ...state,
        ...questions,
        [action.question.id]: action.question,
      };
    case SAVE_ANSWER:
      const { loggedUser, questionId, answer } = action;
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answer]: {
            ...state[questionId][answer],
            votes: state[questionId][answer].votes.concat([loggedUser]),
          },
        },
      };
    default:
      return state;
  }
};
