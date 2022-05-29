const DiscordJS = require("discord.js");
const { Intents } = DiscordJS;
const WOKCommands = require("wokcommands");
// const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", async () => {
  // await mongoose.connect(process.env.DB_CONNECT, {
  //   keepAlive: true,
  // });

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    testServers: process.env.TEST_SERVERS,
    botOwners: process.env.BOT_OWNERS,
    mongoUri: process.env.DB_CONNECT,
    disabledDefaultCommands: [
      "channelonly",
      "command",
      "language",
      "prefix",
      "requiredrole",
      "slash",
    ],
  }).setDefaultPrefix("-");
});

client.login(process.env.BOT_TOKEN);
