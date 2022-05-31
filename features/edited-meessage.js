const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const WelcomeSchema = require("../models/WelcomeSchema");

module.exports = (client) => {
  client.on("messageUpdate", (oldMessage, newMessage) => {
    try {
      if (!oldMessage.author) return;
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
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Message Edited",
        });
      MessageLogChannel.send({ embeds: [editMessageEmbed] });
    } catch (error) {
      console.log(`Edit message error: ${error}`);
    }
  });
};

module.exports.config = {
  displayName: "Edited Message",
  dbName: "EDITED_MESSAGE",
};
