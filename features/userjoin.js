const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const UserLogSchema = require("../models/UserLogSchema");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    const userLogData = await UserLogSchema.findById(member.guild.id);
    if (!userLogData) return;
    const channel = member.guild.channels.cache.get(userLogData.channelID);
    const welcomeEmbed = new MessageEmbed()
      .setColor("#00FF00")
      .setTitle(`${member.user.username}#${member.user.discriminator}`)
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
      )
      .setDescription(`<@${member.id}> joined us!😀`)
      .setFields({
        name: member.user.bot ? "Bot Account" : "\u200b",
        value: `Account created on: ${new Date(
          member.user.createdTimestamp
        ).toLocaleDateString()}`,
      })
      .setFooter({ text: `User Id: ${member.user.id}` })
      .setTimestamp();
    channel.send({ embeds: [welcomeEmbed] });
  });
};
// Configuration
module.exports.config = {
  displayName: "User Leave",
  dbName: "USER_LEAVE",
};
