const DiscordJS = require("discord.js");
const WelcomeSchema = require("../../models/WelcomeSchema");
module.exports = {
  category: "Configuration",
  description: "Sets the welcome channel with a custom message",

  permissions: ["ADMINISTRATOR"],

  minArgs: 2,
  expectedArgs: "<channel> <text>",

  slash: "both",
  testOnly: false,
  guildOnly: true,

  options: [
    {
      name: "channel",
      description: "Target Channel",
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
    },
    {
      name: "text",
      description: "Welcome message",
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],

  callback: async ({ guild, message, interaction, args }) => {
    if (message && !message.mentions.channels.size) {
      return `Incorrect usage!\nPlease use \`${prefix}setwelcome <channel> <welcome-message>\``;
    }
    const target = message
      ? message.mentions.channels.first()
      : interaction.options.getChannel("channel");

    if (!target || target.type !== "GUILD_TEXT") {
      return "Please tag a text Channel";
    }
    let text = interaction?.options.getString("text");
    if (message) {
      args.shift();
      text = args.join(" ");
    }

    await WelcomeSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        text,
        channelID: target.id,
      },
      {
        upsert: true,
      }
    );

    return "Welcome Channel Set!";
  },
};
