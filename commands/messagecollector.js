module.exports = {
  category: "Testing",
  description: "Collect messages",

  callback: ({ message, channel }) => {
    message.reply("Type whatever you can in 10 seconds!");
    const filter = (msg) => {
      return msg.author.id === message.author.id;
    };
    const textCollector = channel.createMessageCollector({
      filter,
      // max: 5,
      time: 1000 * 10,
    });

    textCollector.on("collect", (message) => {
      console.log(message.content);
    });

    textCollector.on("end", (collected) => {
      if (collected.size === 0) {
        message.reply("You didnt type anything lol");
        return;
      }
      let text = "You typed:\n\n";

      collected.forEach((message) => {
        text += `${message.content}\n`;
      });
      message.reply(text);
    });
  },
};
