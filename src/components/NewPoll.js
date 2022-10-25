import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { connect } from "react-redux";

const NewPoll = (props) => {
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const { loggedUser, dispatch } = props;
  const navigate = useNavigate();

  const validate = () => {
    return firstOption.length > 0 && secondOption.length > 0;
  };

  const question = {
    firstOption,
    secondOption,
    author: loggedUser,
  };

  const handleNewQuestion = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(question));
    setFirstOption("");
    setSecondOption("");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="text-center">
          <form className="w-75 mx-auto">
            <h3>Would You Rather</h3>
            <p className="muted">Create your own poll</p>
            <div className="input-group mb-3">
              <input
                className="form-control"
                data-testid="firstOption"
                type="username"
                placeholder="First Option"
                value={firstOption}
                onChange={(e) => setFirstOption(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                className="form-control"
                data-testid="secondOption"
                type="secondOption"
                placeholder="Second Option"
                value={secondOption}
                onChange={(e) => setSecondOption(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleNewQuestion}
                disabled={!validate()}
                data-testid="submit-button"
              >
                Start Poll
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ loggedUser }) => {
  return {
    loggedUser: loggedUser.id === "" ? null : loggedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
