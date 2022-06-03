const mongoose = require("mongoose");
const { Schema } = mongoose;

const EditCountSchema = new Schema({
  _id: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  discriminator: {
    required: true,
    type: Number,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const modelName = "editCount";

module.exports =
  mongoose.model[modelName] ||
  mongoose.model(modelName, EditCountSchema, modelName);
