const DiscordsJS = require("discord.js");
const UserLogSchema = require("../../models/UserLogSchema");
module.exports = {
  category: "Configuration",
  description: "Sets channel for logging user joins and leaves",
  permissions: ["ADMINISTRATOR"],
  minArgs: 1,
  expectedArgs: "<channel>",
  slash: "both",
  testOnly: false,
  guildOnly: true,

  options: [
    {
      name: "channel",
      description: "User log Channel",
      required: true,
      type: DiscordsJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
    },
  ],

  callback: async ({ guild, message, interaction, args, instance, member }) => {
    let prefix = instance.getPrefix(member.guild.id);
    if (message && !message.mentions.channels.size) {
      return `Incorrect usage!\nPlease use \`${prefix}setwelcome <channel>\``;
    }

    const target = message
      ? message.mentions.channels.first()
      : interaction.options.getChannel("channel");
    if (!target || target.type !== "GUILD_TEXT") {
      return "Please tag a text Channel";
    }

    await UserLogSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelID: target.id,
      },
      {
        upsert: true,
      }
    );
    return `<#${target.id}> has been set for user logging.`;
  },
};
