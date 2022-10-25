import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

import { handleSaveAnswer } from "../actions/shared";

const Poll = (props) => {
  const { questionId } = useParams();
  const { dispatch, users, loggedUser, questions } = props;
  const question = questions[questionId];
  const [answered, setAnswered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = users[loggedUser];
    const myAnswers = loggedIn.answers;
    const loggedInAnswer = Object.keys(myAnswers)
      .filter((answer) => {
        return answer === questionId;
      })
      .map((answer) => {
        return myAnswers[answer];
      });
    if (loggedInAnswer.length > 0) {
      setAnswered(true);
    }
  }, [loggedUser, users, questionId, navigate, question]);

  if (!question) {
    return <Navigate to="*" />;
  }

  const author = users[question.author];

  const firstOptionPercentage = () => {
    return (
      (question.optionOne.votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100
    ).toFixed(2);
  };

  const firstOptionResults = {
    percentage: firstOptionPercentage(),
    amount: question.optionOne.votes.length,
  }

  const secondOptionPercentage = () => {
    return (
      (question.optionTwo.votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100
    ).toFixed(2);
  };

  const secondOptionResults = {
    percentage: secondOptionPercentage(),
    amount: question.optionTwo.votes.length,
  }

  const saveAnswer = (answer) => {
    const answerDTO = {
      loggedUser: loggedUser,
      questionId: questionId,
      answer: answer,
    };
    dispatch(handleSaveAnswer(answerDTO));
  };

  return (
    question && (
      <div className="row m-5">
        <div className="container w-60 mx-auto">
          <div className="card-group">
            <div className="card">
              <div className="card-body text-center">
                <img src={author.avatarURL} alt="Poll Author's avatar" width={150} height={150}/>
                <h3>Poll by {author.id}</h3>
                <h3>Would You Rather?</h3>
                <div className="row">
                  <div className="col-xs-6">
                    <div className="card">
                      <div className="card-body">
                        {question.optionOne.text}
                        {!answered && (
                          <div className="d-grid gap-2 mt-2">
                            <button
                              className="btn btn-primary"
                              onClick={() => saveAnswer("optionOne")}
                            >
                              Click
                            </button>
                          </div>
                        )}
                        {answered && (
                          <>
                            <br/>
                            <div className="alert" role="alert">
                              {question.optionOne.votes.includes(loggedUser) && <p className="alert alert-success">You voted for this!</p>}
                              {firstOptionResults.percentage}% ({firstOptionResults.amount}) people voted for this!
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-6">
                    <div className="card">
                      <div className="card-body">
                        {question.optionTwo.text}
                        {!answered && (
                          <div className="d-grid gap-2 mt-2">
                            <button
                              className="btn btn-primary"
                              onClick={() => saveAnswer("optionTwo")}
                            >
                              Click
                            </button>
                          </div>
                        )}
                        {answered && (
                          <>
                          <br/>
                          <div className="alert" role="alert">
                            {question.optionTwo.votes.includes(loggedUser) && <p className="alert alert-success">You voted for this!</p>}
                            {secondOptionResults.percentage}% ({secondOptionResults.amount}) people voted for this!
                          </div>
                        </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = ({ loggedUser, users, questions }, { id }) => {
  return {
    loggedUser,
    questions,
    users,
  };
};

export default connect(mapStateToProps)(Poll);
