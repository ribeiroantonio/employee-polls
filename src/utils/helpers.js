export const formatQuestion = (question, author) => {
  const { id, timestamp, firstOption, secondOption } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    firstOption: {
      votes: [],
      text: firstOption,
    },
    secondOption: {
      votes: [],
      text: secondOption,
    },
  };
};

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}
