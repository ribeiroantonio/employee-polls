import { connect } from "react-redux";
import PollCard from "./PollCard";

const Dashboard = (props) => {
  const newPolls = props.newPolls;
  const answeredPolls = props.answeredPolls;

  return (
    <div className="container mt-5">
      <div className="card m-4">
        <div className="card-header">
          New Polls: {newPolls.length}
        </div>
        <div className="card-body">
          {newPolls.map((id) => (
            <PollCard key={id} id={id} />
          ))}
        </div>
      </div>
      <div className="card m-4">
        <div className="card-header">
          Answered Polls: {answeredPolls.length}
        </div>
        <div className="card-body">
          {answeredPolls.map((id) => (
            <PollCard key={id} id={id} />
          ))}
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
