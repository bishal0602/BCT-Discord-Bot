const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const UserSchema = new Schema({
  _id: requiredString,
  channelID: requiredString,
});

const name = "userLogSchema";

module.exports =
  mongoose.models[name] || mongoose.model(name, UserSchema, name);
