import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import loggedUser from  '../reducers/loggedUser';
import questions from  '../reducers/questions';
import users from  '../reducers/users';
import Login from "../components/Login";

const store = configureStore({
  reducer: {
    loggedUser,
    questions,
    users,
  },
});

describe("when rendering login page", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
