const DiscordJS = require("discord.js");
const { Intents } = DiscordJS;

const dotenv = require("dotenv");
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() == "hi") {
    message.reply({
      content: "hello",
    });
  }
});

client.login(process.env.BOT_TOKEN);
