module.exports = {
  name: "echo",
  description: "Repeats what you say!",
  category: "Fun",

  testOnly: false,
  slash: true,

  options: [
    {
      name: "message",
      description: "Message you want the bot to say!",
      required: true,
      type: 3,
    },
  ],

  callback: ({ interaction, args }) => {
    const string = interaction.options.getString("message");

    if (interaction) {
      interaction.reply({
        content: string,
      });
    }
  },
};
