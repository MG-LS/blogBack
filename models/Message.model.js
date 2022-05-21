const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  conversationId: String,
  sender: String,
  text: String
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;