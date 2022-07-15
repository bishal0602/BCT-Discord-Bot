module.exports = {
  category: "Testing",
  description: "Simulate a leave",

  permissions: ["ADMINISTRATOR"],

  slash: "both",
  testOnly: false,

  guildOnly: true,

  callback: ({ member, client }) => {
    client.emit("guildMemberRemove", member);
    return "Leave Simulated!";
  },
};
