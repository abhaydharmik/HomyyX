const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "user" }, // user | system
    room: { type: String, required: true },
    actor: { type: String }, // 🔥 who triggered system msg
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
