const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const WelcomeSchema = new Schema({
  _id: requiredString,
  channelID: requiredString,
  text: requiredString,
});

const name = "welcome";

module.exports =
  mongoose.models[name] || mongoose.model(name, WelcomeSchema, name);
