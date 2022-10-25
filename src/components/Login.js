import React, {useState} from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logUserIn from "../actions/loggedUser";

const Login = ({ users, dispatch }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const validateCredentials = () => {
    return users.find((user) => user.id === name && user.password === password);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateCredentials()) {
      dispatch(logUserIn(name));
      const path = location.pathname;
      if (path.includes("login")) {
        navigate("/");
      } else {
        navigate(path);
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container-sm mt-5">
      <form>
        <h2>Log in to Employee Polls</h2>
        <div className="mb-3">
          <label htmlFor="userNameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="userNameInput" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>Log In</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users).map((id) => users[id]),
  };
};

export default connect(mapStateToProps)(Login);
