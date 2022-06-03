const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const EditCountSchema = require("../../models/EditCountSchema");

module.exports = {
  category: "Fun",
  description: "Shows the number of edits made my users",

  slash: true,

  callback: async ({ interaction }) => {
    const editCounts = await EditCountSchema.find({}).sort({ count: -1 });
    // console.log(editCounts);
    let field = await editCounts.map((edit) => {
      return {
        name: "\u200b",
        value: `${edit.username}#${edit.discriminator} :  ${edit.count}`,
      };
    });
    console.log(field);
    const reply = {
      color: "#0099ff",
      title: "Edit Learboard",
      fields: field,
    };

    await interaction.reply({ embeds: [reply] });
  },
};
