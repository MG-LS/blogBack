const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: String,
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  blog: {
    ref: "Blog",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;