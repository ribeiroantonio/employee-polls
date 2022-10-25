import { RETRIEVE_USERS } from "../actions/users";
import { ADD_ANSWER_TO_USER } from "../actions/users";
import { ADD_QUESTION_TO_USER } from "../actions/users";

export default function users (state = {}, action) {
  switch (action.type) {
    case RETRIEVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION_TO_USER:
      const { id, author } = action;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id]),
        },
      };
    case ADD_ANSWER_TO_USER:
      const { loggedUser, questionId, answer } = action;
      return {
        ...state,
        [loggedUser]: {
          ...state[loggedUser],
          answers: {
            ...state[loggedUser].answers,
            [questionId]: answer,
          },
        },
      };
    default:
      return state;
  }
};
