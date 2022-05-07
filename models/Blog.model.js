const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  img: String,
  likes: [{
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  }],
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
