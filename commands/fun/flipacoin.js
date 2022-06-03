const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;

module.exports = {
  category: "Fun",
  description: "Flips a coin",

  slash: true,

  callback: ({ interaction, user }) => {
    console.log(user);
    const initialMessage = new MessageEmbed()
      .setColor("#FFD700")
      .setTitle("Flipping a coin.....")
      .setFooter({ text: `${user.username}#${user.discriminator}` });
    interaction.reply({ embeds: [initialMessage] });
    const result = Math.random() < 0.5 ? "Heads it is!" : "Tails it is!";
    const finalMessage = new MessageEmbed()
      .setColor("#FFD700")
      .setTitle(result)
      .setFooter({
        text: `${user.username}#${user.discriminator}`,
        iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      });

    setTimeout(() => {
      interaction.editReply({ embeds: [finalMessage] });
    }, 3000);
  },
};
