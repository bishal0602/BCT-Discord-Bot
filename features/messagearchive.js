const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;

module.exports = (client) => {
  client.on("messageReactionAdd", (member) => {
    try {
      if (member._emoji.name === "📝") {
        const ArchiveChannel =
          member.message.guild.channels.cache.get("988462615468580928");
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
          .setDescription(member.message.content)
          .setTimestamp()
          .setFooter({
            text: "Message Archive",
          });
        ArchiveChannel.send({ embeds: [editMessageEmbed] });
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
