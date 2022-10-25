import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {handleInitialData} from "../actions/shared";
import { Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login'
import Leaderboard from './Leaderboard'
import NewPoll from './NewPoll'
import Poll from './Poll'
import Error from './Error'
import Dashboard from './Dashboard'

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return (
    <div>
      {props.userLoggedIn === false ? (<Login />) : (
        <div>
          <Nav/>
          <Routes>
            <Route path="/" exact element={<Dashboard/>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/add" element={<NewPoll />} />
            <Route path="/questions/:questionId" element={<Poll />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({loggedUser}) => ({
  userLoggedIn: !!loggedUser,
});

export default connect(mapStateToProps)(App);
