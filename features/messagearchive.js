const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;

// Archives a message to a specific channel when reacted with Pencil-on-Note emote

module.exports = (client) => {
  client.on("messageReactionAdd", (member) => {
    try {
      const { message } = member;
      if (member._emoji.name === "📝" && member.count > 1) {
        return;
      }
      if (member._emoji.name === "📝") {
        const ArchiveChannel =
          message.guild.channels.cache.get("988462615468580928");
        if (message.embeds.length != 0) {
          const messageEmbed = message.embeds[0];
          ArchiveChannel.send({ embeds: [messageEmbed] });
        } else if (message.attachments.size > 0) {
          message.attachments.forEach((att) => {
            const attachment = new MessageAttachment(att.url, att.name);
            ArchiveChannel.send({
              files: [attachment],
            });
          });
        } else {
          const colorArray = [
            "#6A0DAD",
            "#BBDEFB",
            "#FF9800",
            "#E91E63",
            "#26A69A",
          ];
          const randomColor =
            colorArray[Math.floor(Math.random() * colorArray.length)];
          const editMessageEmbed = new MessageEmbed()
            .setColor(randomColor)
            .setAuthor({
              name: `${member.message.author.username}#${member.message.author.discriminator}`,
              iconURL: `https://cdn.discordapp.com/avatars/${member.message.author.id}/${member.message.author.avatar}.png`,
            })
            .setDescription(member.message.content);
          ArchiveChannel.send({ embeds: [editMessageEmbed] });
        }
      }
    } catch (error) {
      console.log(`Message Archive Error: ${error}`);
    }
  });
};

module.exports.config = {
  displayName: "Archive Message",
  dbName: "ARCHIVE_MESSAGE",
};
