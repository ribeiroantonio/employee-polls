import { connect } from "react-redux";
import PollCard from "./PollCard";

const Dashboard = (props) => {
  const newPolls = props.newPolls;
  const answeredPolls = props.answeredPolls;

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs" id="pollsTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button" role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true">
              New Polls: {newPolls.length}
            </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false">
              Answered Polls: {answeredPolls.length}
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0">
          <div className="card">
            <div className="card-body">
              {newPolls.map((id) => (
                <PollCard key={id} id={id} />
              ))}
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0">
          <div className="card">
            <div className="card-body">
              {answeredPolls.map((id) => (
                <PollCard key={id} id={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, loggedUser, users }) => {
  const user = users[loggedUser];
  return {
    questions: Object.values(questions),
    answeredPolls: Object.keys(questions)
      .filter((question) => Object.keys(user.answers).includes(question))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    newPolls: Object.keys(questions)
      .filter((question) => !Object.keys(user.answers).includes(question))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    user,
  };
};

export default connect(mapStateToProps)(Dashboard);
