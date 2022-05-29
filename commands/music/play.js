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
  description: "Play a song",

  slash: true,
  testOnly: true,

  options: [
    {
      type: "STRING",
      name: "song",
      description: "The song that you wish to play",
      required: true,
    },
  ],

  callback: async ({ interaction, guild }) => {
    if (!guild) {
      return "This can only be used in a guild.";
    }
    let user = interaction.member;
    if (!user.voice.channel) {
      return "Please join a Voice Channel first!";
    }
    let song = interaction.options.getString("song");
    let channel = user.voice.channel;

    music.play({
      interaction: interaction,
      channel: channel,
      song: song,
    });

    embed = new MessageEmbed()
      .setColor("#8e44ad")
      .setTitle("Your Song Is Now Playing")
      .setDescription(`${song} is now playing in ${channel?.name}`);

    return embed;
  },
};
