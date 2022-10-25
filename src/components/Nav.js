import { connect } from "react-redux";
import logUserIn from "../actions/loggedUser";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const { dispatch } = props;

  const handleLogout = (e) => {
    dispatch(logUserIn(null));
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/add">New</Link>
            </li>
          </ul>
            <div className="m-2">Logged in as: {props.username}</div>
            <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
};

function mapStateToProps({ loggedUser }) {
  return {
    username: loggedUser
  }
}

export default connect(mapStateToProps)(Nav);
