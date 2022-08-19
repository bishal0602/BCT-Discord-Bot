module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    const roles = ["968674913680506929", "968674913693102120"];
    let flag = 0;
    try {
      if (!message.content.toLowerCase().includes("vote y")) return;
      roles.forEach((x) => {
        if (message.member.roles.cache.has(x)) {
          flag = 1;
          return;
        }
      });
      if (!flag) return;
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
