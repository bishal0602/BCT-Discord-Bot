const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const DeleteCountSchema = require("../models/DeleteCountSchema");
const MessageLogSchema = require("../models/MessageLogSchema");

module.exports = (client) => {
  client.on("messageDelete", async (message) => {
    try {
      // console.log(message);
      const messageLogData = await MessageLogSchema.findById(message.guildid);
      if (!messageLogData) return;
      const MessageLogChannel = message.member.guild.channels.cache.get(
        messageLogData.channelID
      );
      if (!MessageLogChannel) return;
      // const MessageLogChannel = client.channels.cache.get("978687664612081714");
      const delMessageEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setAuthor({
          name: `${message.author.username}#${message.author.discriminator}`,
          iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`,
        })
        .addFields(
          {
            name: "Deleted message:",
            value: message.content,
          },
          {
            name: "Channel: ",
            value: `<#${message.channelId}>`,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Message Deleted",
        });
      MessageLogChannel.send({ embeds: [delMessageEmbed] });
      await DeleteCountSchema.findOneAndUpdate(
        {
          _id: message.author.id,
        },
        {
          username: message.author.username,
          discriminator: message.author.discriminator,
          $inc: { count: 1 },
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      console.log(`Delete message error: ${error}`);
    }
  });
};

module.exports.config = {
  displayName: "Deleted Message",
  dbName: "DELETED_MESSAGE",
};
