import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatQuestion, formatDate } from "../utils/helpers";

const PollCard = (props) => {
  if (props.question === null) {
    return <p>This Question doesn't exist</p>;
  }

  const { name, timestamp, id } = props.question;

  return(
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p>{formatDate(timestamp)}</p>
        <Link to={"/questions/" + id}>
          <button className="btn btn-primary">Show</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ loggedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    loggedUser,
    question: formatQuestion(question, users[question.author]),
  };
};

export default connect(mapStateToProps)(PollCard);
