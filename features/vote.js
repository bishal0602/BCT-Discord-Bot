module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    try {
      if (!message.content.toLowerCase().includes("vote y")) return;
      if (!message.member.roles.cache.has("968674913693102120")) return; // only works for CR role
      message.react("🇾");
      message.react("🇳");
    } catch (error) {
      console.log(`Vote Message Reaction error: ${error}`);
    }
  });
};

module.exports.config = {
  displayName: "VOTE YES NO REACTION",
  dbName: "VOTE_REACTION",
};
