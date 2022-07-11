const DiscordJS = require("discord.js");

module.exports = {
  name: "echo",
  description: "Sends your message to a specific channel",
  category: "Fun",

  testOnly: false,
  slash: true,
  // permissions: ["ADMINISTRATOR"],

  options: [
    {
      name: "destination",
      description: "Destination Channel",
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
    },
    {
      name: "message",
      description: "Your message",
      required: true,
      type: "STRING",
    },
  ],

  callback: ({ interaction, args, member }) => {
    // console.log(args);
    const channelId = args[0];
    const message = args[1];
    const destination = member.guild.channels.cache.get(channelId);
    destination.send(message);
    interaction.reply(`Message sent to <#${channelId}>`);
  },
};
