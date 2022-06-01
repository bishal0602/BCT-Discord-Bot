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
  description: "Set repeat to on or off",

  slash: true,

  options: [
    {
      name: "on_or_off",
      type: "BOOLEAN",
      description:
        "Either say true to make the music repeat, or false to not make it repeat",
      required: true,
    },
  ],

  callback: async ({ interaction, guild }) => {
    const Switch = interaction.options.getBoolean("on_or_off");
    let user = interaction.member;
    let channel = user.voice.channel;
    if (!guild) {
      return "This can only be used in a guild.";
    }
    if (!user.voice.channel) {
      return "Please join a Voice Channel first!";
    }
    try {
      music.repeat({ interaction: interaction, value: Switch });

      embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Music Repeated")
        .setDescription(`The music in ${channel?.name} has been repeated`);
    } catch (error) {
      console.log(`Music Error: ${error}`);
    }
    return embed;
  },
};
