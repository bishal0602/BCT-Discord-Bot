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
  description: "Gets the music queue",

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

    const queue = await music.getQueue({ interaction });
    // console.log(queue);
    let queueList = " ";
    queue.forEach((song, index) => {
      queueList = `${queueList}\n ${index + 1}. ${song.info.title}`;
    });

    embed = new MessageEmbed()
      .setColor("#a6acaf")
      .setTitle("Music Queue")
      .setDescription(`The current queue for ${channel?.name} is ${queueList}`);

    return embed;
  },
};
