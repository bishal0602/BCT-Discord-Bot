const DiscordJS = require("discord.js");
const { Constants, MessageActionRow, MessageButton } = DiscordJS;

module.exports = {
  category: "Moderation",
  description: "Kicks a user.",
  permissions: ["KICK_MEMBERS"],

  slash: true,
  testOnly: true,
  guildOnly: true,

  minArgs: 2,
  expectedArgs: "<user> <reason>",
  options: [
    {
      name: "user",
      description: "The target user.",
      required: true,
      type: Constants.ApplicationCommandOptionTypes.USER,
    },
    {
      name: "reason",
      description: "The kick reason.",
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],

  callback: async ({ interaction, channel }) => {
    const target = interaction.options.getMember("user");

    if (!target) return "Please tag someone to kick.";

    if (!target.kickable) return "User cannot be kicked.";

    const reason = interaction.options.getString("reason");

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("confirm")
          .setLabel("Confirm")
          .setStyle("DANGER")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("cancel")
          .setLabel("Cancel")
          .setStyle("SECONDARY")
      );

    await interaction.reply({
      content: `Are you sure you want to kick <@${target.id}>?\n\nReason: ${reason}`,
      components: [row],
      ephemeral: false,
    });

    const filter = (btnInteraction) => {
      return interaction.user.id === btnInteraction.user.id;
    };

    const collector = channel.createMessageComponentCollector({
      filter,
      componentType: "BUTTON",
      max: 1,
      time: 1000 * 15,
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0) {
        await interaction.editReply({
          content: "You did not respond in time.",
          components: [],
        });
        return;
      }

      if (collected.first()?.customId === "confirm") {
        await target.kick(reason);
        await interaction.editReply({
          content: `<@${target.id}> has been kicked. \n\nReason: ${reason}`,
          components: [],
        });
      } else if (collected.first()?.customId === "cancel") {
        await interaction.editReply({
          content: "Interaction Cancelled.",
          components: [],
        });
      }
    });

    return;
  },
};
