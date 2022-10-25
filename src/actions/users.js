export const RETRIEVE_USERS = "RETRIEVE_USERS";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export const retrieveUsers = (users) => {
  return {
    type: RETRIEVE_USERS,
    users,
  };
};

export const addAnswerToUser = ({ loggedUser, questionId, answer }) => {
  return {
    type: ADD_ANSWER_TO_USER,
    loggedUser,
    questionId,
    answer,
  };
};

export const addQuestionToUser = ({ id, author }) => {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
};
