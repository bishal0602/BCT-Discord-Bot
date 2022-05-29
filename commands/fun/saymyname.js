module.exports = {
  category: "Fun",
  description: "Says your name",
  slash: "both",
  testOnly: false,
  callback: ({ user }) => {
    return `${user.username.toUpperCase()}!`;
  },
};
