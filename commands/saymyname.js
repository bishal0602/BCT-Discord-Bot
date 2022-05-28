module.exports = {
  category: "Testing",
  description: "says name",
  slash: "both",
  testOnly: true,
  callback: ({ user }) => {
    return `${user.username.toUpperCase()}!`;
  },
};
