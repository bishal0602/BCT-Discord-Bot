const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const WelcomeSchema = require("../models/WelcomeSchema");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    console.log("member joined!");
    // console.log(member);
    const welcomeData = await WelcomeSchema.findById(member.guild.id);
    // console.log(welcomeData);
    const channel = member.guild.channels.cache.get(welcomeData.channelID);

    //random color picker
    const colorArray = [
      "#00FFFF",
      "#ADD8E6",
      "#FFC0CB",
      "#1589FF",
      "#50C878",
      "#228B22",
      "#F5FFFA",
      "#FFFF33",
      "#FF6700",
    ];
    const randomColor =
      colorArray[Math.floor(Math.random() * colorArray.length)];
    const welcomeEmbed = new MessageEmbed()
      .setColor(randomColor)
      .setTitle(`${member.user.username}#${member.user.discriminator}`)
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
      )
      .setDescription(welcomeData.text.replace(/@/g, `<@${member.id}>`))
      .setFields({
        name: member.user.bot ? "Bot Account" : "\u200b",
        value: `Account created at ${new Date(
          member.user.createdTimestamp
        ).toLocaleDateString()}`,
      })
      .setTimestamp();
    channel.send({ embeds: [welcomeEmbed] });
  });
};
// Configuration
module.exports.config = {
  displayName: "Welcome Channel",
  dbName: "WELCOME_CHANNEL",
};
