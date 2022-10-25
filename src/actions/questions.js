import { saveQuestion } from "../utils/api";
import { addQuestionToUser } from "./users";

export const RETRIEVE_QUESTIONS = "RETRIEVE_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_ANSWER = "SAVE_ANSWER";

export const retrieveQuestions = (questions) => {
  return {
    type: RETRIEVE_QUESTIONS,
    questions,
  };
};

export const saveUserQuestion = (question) => {
  return {
    type: SAVE_QUESTION,
    question,
  };
};

export const handleAddQuestion = (question) => {
  return (dispatch) => {
    return saveQuestion(question).then((question) => {
      dispatch(saveUserQuestion(question));
      dispatch(addQuestionToUser(question));
    });
  };
};

export const saveQuestionAnswer = ({ loggedUser, questionId, answer }) => {
  return {
    type: SAVE_ANSWER,
    loggedUser,
    questionId,
    answer,
  };
};
