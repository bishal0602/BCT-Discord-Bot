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
  description: "Jumps to a specific song",

  slash: true,

  options: [
    {
      name: "number",
      type: "INTEGER",
      description: "The number of the song in the queue you want to jump to",
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
      music.jump({ interaction: interaction, number: number });

      embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Music Jumped")
        .setDescription(
          `The queue has now been skipped to ${number}, in ${channel?.name}`
        );
    } catch (error) {
      console.log(`Music Error: ${error}`);
    }

    return embed;
  },
};
