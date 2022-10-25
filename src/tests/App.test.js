import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import loggedUser from  '../reducers/loggedUser';
import questions from  '../reducers/questions';
import users from  '../reducers/users';
import App from "../components/App";
import logUserIn from "../actions/loggedUser";

const store = configureStore({
  reducer: {
    loggedUser,
    questions,
    users,
  },
});

describe("when rendering error page", () => {
  it("matches snapshot", () => {
    const user = "sarahedo"
    store.dispatch(logUserIn(user));

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
