module.exports = {
  category: "Testing",
  description: "Says your name",
  slash: "both",
  testOnly: false,
  callback: ({ user }) => {
    return `${user.username.toUpperCase()}!`;
  },
};
