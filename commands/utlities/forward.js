const DiscordJS = require("discord.js");
const { MessageEmbed, MessageAttachment } = DiscordJS;

module.exports = {
  category: "utility",
  description: "Forwards a message to a specific channel",

  guildOnly: true,
  slash: true,
  testOnly: false,
  options: [
    {
      name: "destination",
      description: "Destination Channel",
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
    },
    {
      name: "message_link",
      description: "Link of Message to be forwarded",
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],

  callback: ({ member, args, interaction, client }) => {
    // console.log(x);
    // console.log(args);
    let destinationChannel = member.guild.channels.cache.get(args[0]);
    let MessageLink = args[1];
    let messageLinkArray = MessageLink.split("/");
    let serverId = messageLinkArray[messageLinkArray.length - 3];
    let channelId = messageLinkArray[messageLinkArray.length - 2];
    let messageId = messageLinkArray[messageLinkArray.length - 1];

    if (serverId == null || channelId == null || messageId == null) {
      interaction.reply("Invalid Message Link");
      return;
    }

    client.channels.fetch(channelId).then((channel) => {
      channel.messages
        .fetch(messageId)
        .then((message) => {
          if (message.embeds.length != 0) {
            const messageEmbed = message.embeds[0];
            destinationChannel.send({ embeds: [messageEmbed] });
          } else if (message.attachments.size > 0) {
            // console.log(message.attachments);
            message.attachments.forEach((att) => {
              const attachment = new MessageAttachment(att.url, att.name);
              destinationChannel.send({
                files: [attachment],
              });
            });
          } else {
            const messageEmbed = new MessageEmbed()
              .setColor("#6A0DAD")
              .setAuthor({
                name: `${message.author.username}#${message.author.discriminator}`,
                iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`,
              })
              .setDescription(message.content);
            destinationChannel.send({ embeds: [messageEmbed] });
            interaction.reply(`Message Forwarded to <#${args[0]}!>`);
          }
        })
        .catch((error) => {
          console.log(`Message Format Error: ${error}`);
          interaction.reply(
            "Sorry, some error occurred and your message could not be forwarded."
          );
        });
    });
  },
};
