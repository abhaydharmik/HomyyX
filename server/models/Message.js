const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "user" },
    room: {type: String, required: true}
  },
  {timestamps: true}
);

module.exports = mongoose.model("Message", messageSchema)