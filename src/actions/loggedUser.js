export const LOG_USER_IN = "LOG_USER_IN";

const logUserIn = (id) => {
  return {
    type: LOG_USER_IN,
    id,
  };
};

export default logUserIn;
