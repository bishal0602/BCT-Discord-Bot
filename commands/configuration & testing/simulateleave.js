module.exports = {
  category: "Testing",
  description: "simulate a join",

  permissions: ["ADMINISTRATOR"],

  slash: "both",
  testOnly: false,

  guildOnly: true,

  callback: ({ member, client }) => {
    client.emit("guildMemberRemove", member);
    return "Join Simulated!";
  },
};
