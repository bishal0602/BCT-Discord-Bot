module.exports = {
  category: "Collectors",
  description: "Emoji Collector",

  callback: ({ message }) => {
    ["👍", "👎"].forEach((emoji) => {
      message.react(emoji);
    });

    const filter = (reaction, user) => {
      return user.id === message.author.id;
    };

    const emojiCollector = message.createReactionCollector({
      filter,
      max: 1,
      time: 1000 * 5,
    });

    emojiCollector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    emojiCollector.on("end", (collected) => {
      if (collected.size === 0) {
        message.reply(`You didnt react`);
        return;
      }

      let reply = "You reacted with:\n\n";

      collected.forEach((message) => {
        reply += `${message.emoji.name}\n`;
      });

      message.reply(reply);
    });
  },
};
