import { LOG_USER_IN } from "../actions/loggedUser";

export default function loggedUser(state = null, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return action.id;
    default:
      return state;
  }
};
