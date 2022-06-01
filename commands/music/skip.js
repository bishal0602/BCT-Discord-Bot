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
  description: "Skip the music playing in your VC",

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
      music.skip({ interaction: interaction });

      embed = new MessageEmbed()
        .setColor("#f4d03f")
        .setTitle("Music Skipped!")
        .setDescription(`The music in ${channel?.name} has been skipped`);
    } catch (error) {
      console.log(`Music Error: ${error}`);
    }
    return embed;
  },
};
