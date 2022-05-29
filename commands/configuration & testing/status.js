module.exports = {
  category: "configuration",
  description: "Sets bot status",

  minArgs: 1,
  expectedArgs: "<status>",

  slash: "both",
  //   testOnly: true,

  ownerOnly: true,

  callback: ({ client, text }) => {
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: text,
        },
      ],
    });
    return "Status Updated";
  },
};
