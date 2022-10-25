import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { configureStore } from '@reduxjs/toolkit';
import loggedUser from  '../reducers/loggedUser';
import questions from  '../reducers/questions';
import users from  '../reducers/users';
import NewPoll from "../components/NewPoll";
import logUserIn from "../actions/loggedUser";
import { _saveQuestion } from "../utils/_DATA";

const store = configureStore({
  reducer: {
    loggedUser,
    questions,
    users,
  },
});

describe("when saving poll with correctly formatted data", () => {
  describe("and provided data is correctly formatted", () => {
    it("returns the saved question", async () => {
      const question = {
        firstOption: "Watch Lord of the Rings",
        secondOption: "Watch Game of Thrones",
        author: "sarahedo",
      };
      const expectedAttributes = {
        id: expect.any(String),
        author: question.author,
        optionOne: { text: question.firstOption, votes: [] },
        optionTwo: { text: question.secondOption, votes: [] },
        timestamp: expect.any(Number),
      }

      const savedQuestion = await _saveQuestion(question);

      expect(savedQuestion).toEqual(expect.objectContaining(expectedAttributes));
    });
  });

  describe("and provided data is not correct", () => {
    it("returns an error message.", async () => {
      const incorrectQuestion = {
        secondOption: "Node",
        author: "sarahedo",
      };

      await expect(_saveQuestion(incorrectQuestion)).rejects.toEqual(
        "Please provide firstOption, secondOption, and author"
      );
    });
  })
});

describe("when accessing the create new poll form", () => {
  describe("and the input fields are blank", () => {
    it("disables the create button", async () => {
      const userState = {
        id: "sarahedo",
      }
      store.dispatch(logUserIn(userState));

      render(
        <MemoryRouter>
          <Provider store={store}>
            <NewPoll />
          </Provider>
        </MemoryRouter>
      );

      expect(screen.getByTestId("submit-button")).toBeDisabled();
    });
  });

  describe("and both input fields are filled", () => {
    it("enables the create button", async () => {
      const userState = {
        id: "sarahedo",
      }
      store.dispatch(logUserIn(userState));

      render(
        <MemoryRouter>
          <Provider store={store}>
            <NewPoll />
          </Provider>
        </MemoryRouter>
      );
      const option1 = screen.getByTestId("firstOption");
      const option2 = screen.getByTestId("secondOption");
      fireEvent.change(option1, { target: { value: "Read Percy Jackson" } });
      fireEvent.change(option2, { target: { value: "Read Harry Potter" } });

      expect(screen.getByTestId("submit-button")).not.toBeDisabled();
    });
  });
});
