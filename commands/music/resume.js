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
  description: "Resumes music",

  slash: true,

  callback: async ({ interaction, guild }) => {
    let user = interaction.member;
    let channel = user.voice.channel;
    if (!guild) {
      return "This can only be used in a guild.";
    }
    if (!user.voice.channel) {
      return "Please join a Voice Channel first!";
    }
    try {
      music.resume({ interaction: interaction });

      embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Music Resumed")
        .setDescription(`The music in ${channel?.name} has been resumed`);
    } catch (error) {
      console.log(`Music Error: ${error}`);
    }
    return embed;
  },
};
