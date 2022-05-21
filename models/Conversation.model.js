const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  members: {
    type: Array
  }
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;