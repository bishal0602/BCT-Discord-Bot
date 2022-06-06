const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const EditCountSchema = require("../models/EditCountSchema");

module.exports = (client) => {
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    try {
      // console.log(oldMessage);
      if (!oldMessage.author) return;
      if (oldMessage.content === newMessage.content) return;
      const MessageLogChannel = client.channels.cache.get("978687664612081714");
      const editMessageEmbed = new MessageEmbed()
        .setColor("#6F8FAF")
        .setAuthor({
          name: `${oldMessage.author.username}#${oldMessage.author.discriminator}`,
          iconURL: `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.png`,
        })
        .addFields(
          {
            name: "Before:",
            value: oldMessage.content,
          },
          {
            name: "After: ",
            value: newMessage.content,
          },
          {
            name: "Channel: ",
            value: `<#${oldMessage.channelId}>`,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Message Edited",
        });
      MessageLogChannel.send({ embeds: [editMessageEmbed] });
      // console.log("edit registered");
      await EditCountSchema.findOneAndUpdate(
        {
          _id: oldMessage.author.id,
        },
        {
          username: oldMessage.author.username,
          discriminator: oldMessage.author.discriminator,
          $inc: { count: 1 },
        },
        {
          upsert: true,
        }
      );
      // console.log("edit database updated!");
    } catch (error) {
      console.log(`Edit message error: ${error}`);
    }
  });
};

module.exports.config = {
  displayName: "Edited Message",
  dbName: "EDITED_MESSAGE",
};
