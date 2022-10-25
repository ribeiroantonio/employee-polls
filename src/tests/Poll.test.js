import { _saveQuestionAnswer } from "../utils/_DATA";

describe("when answering a poll", () => {
  describe("and the provided answer data is correctly formatted", () => {
    it("returns true", async () => {
      const answer = _saveQuestionAnswer({
        loggedUser: "sarahedo",
        questionId: "vthrdm985a262al8qx3do",
        answer: "optionTwo",
      });

      await expect(answer).resolves.toEqual(true);
    });
  });

  describe("and the provided data is not correct", () => {
    it("returns an error message", async () => {
      const invalidAnswer = {
        loggedUser: "flub",
        questionId: "1",
      };

      await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
        "Please provide loggedUser, questionId, and answer"
      );
    });
  });
});
