const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const MessageLogSchema = new Schema({
  _id: requiredString,
  channelID: requiredString,
});

const name = "messageLogSchema";

module.exports =
  mongoose.model[name] || mongoose.model(name, MessageLogSchema, name);
