const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const DeleteCountSchema = require("../../models/DeleteCountSchema");

module.exports = {
  category: "Fun",
  description: "Shows the number message deleted by my users",

  slash: true,

  callback: async ({ interaction }) => {
    const deleteCounts = await DeleteCountSchema.find({}).sort({ count: -1 });
    // console.log(editCounts);
    let field = " ";
    await deleteCounts.forEach((del) => {
      field += `${del.username}#${del.discriminator} :  ${del.count}\n`;
    });
    // console.log(field);
    const reply = {
      color: "#FF7F7F",
      title: "Delete Leaderboard",
      fields: [{ name: "\u200b", value: field }],
    };

    await interaction.reply({ embeds: [reply] });
  },
};
