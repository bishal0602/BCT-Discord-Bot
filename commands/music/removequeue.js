const DiscordJS = require("discord.js");
const {
  MessageEmbed,
  Client,
  Guild,
  GuildMember,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  ReactionUserManager,
  Role,
  TextChannel,
} = DiscordJS;
const music = require("@koenie06/discord.js-music");
let embed;

module.exports = {
  category: "Music",
  description: "Removes song from queue",

  slash: true,

  options: [
    {
      name: "number",
      type: "INTEGER",
      description: "The number of the song you want to remove from the queue",
      required: true,
    },
  ],

  callback: async ({ interaction, guild }) => {
    const number = interaction.options.getInteger("number");
    let user = interaction.member;
    let channel = user.voice.channel;
    if (!guild) {
      return "This can only be used in a guild.";
    }
    if (!user.voice.channel) {
      return "Please join a Voice Channel first!";
    }
    try {
      music.removeQueue({ interaction: interaction, number: number });

      embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Music Removed From Queue")
        .setDescription(
          `The song with the value ${number} has been removed from ${channel?.name}'s queue`
        );
    } catch (error) {
      console.log(`Music Error: ${error}`);
    }
    return embed;
  },
};
