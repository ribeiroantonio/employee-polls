import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { retrieveUsers, addAnswerToUser } from "./users";
import {
  retrieveQuestions,
  saveQuestionAnswer as saveAnswer,
} from "./questions";

export const handleInitialData = () => {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(retrieveUsers(users));
      dispatch(retrieveQuestions(questions));
    });
  };
};

export const handleSaveAnswer = (answer) => {
  return (dispatch) => {
    saveQuestionAnswer(answer)
      .then(() => {
        dispatch(saveAnswer(answer));
        dispatch(addAnswerToUser(answer));
      })
      .catch((e) => {
        console.log("Answer not saved: ", e);
        alert("Answer not saved.");
      });
  };
};
