const DiscordJS = require("discord.js");
const { MessageEmbed } = DiscordJS;
const axios = require("axios");

module.exports = {
  category: "Fun",
  description: "Generates a meme from reddit",
  slash: "both",
  callback: ({ message, interaction }) => {
    const subreddits = ["memes", "dankmemes", "wholesomememes", "holup"];
    const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];
    axios
      .get(`https://meme-api.herokuapp.com/gimme/${randomSub}`)
      .then((data) => {
        // console.log(data.data);
        const { title, url, postLink, author, ups, subreddit } = data.data;
        const memeEmbed = new MessageEmbed()
          .setColor(0x0099ff)
          .setTitle(title)
          .setURL(postLink)
          //   .setAuthor({ name: author })
          .setImage(url);
        //   .setFooter({ text: `Upvotes:${ups}    Posted in r/${subreddit}` });
        interaction
          ? interaction.reply({ embeds: [memeEmbed] })
          : message.channel.send({ embeds: [memeEmbed] });
      })
      .catch((err) => {
        console.log(`Meme API Error ${err}`);
      });
  },
};
