module.exports = {
  category: "Testing",
  description: "simulate a join",

  permissions: ["ADMINISTRATOR"],

  slash: "both",
  testOnly: false,

  guildOnly: true,

  callback: ({ member, client }) => {
    client.emit("guildMemberAdd", member);
    return "Join Simulated!";
  },
};
