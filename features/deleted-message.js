const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;

module.exports = (client) => {
  client.on("messageDelete", (message) => {
    try {
      //   console.log(message);
      const MessageLogChannel = client.channels.cache.get("978687664612081714");
      const editMessageEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setAuthor({
          name: `${message.author.username}#${message.author.discriminator}`,
          iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`,
        })
        .addFields({
          name: "Deleted message:",
          value: message.content,
        })
        .setTimestamp()
        .setFooter({
          text: "Message Deleted",
        });
      MessageLogChannel.send({ embeds: [editMessageEmbed] });
    } catch (error) {
      console.log(`Delete message error: ${error}`);
    }
  });
};

module.exports.config = {
  displayName: "Edited Message",
  dbName: "EDITED_MESSAGE",
};
