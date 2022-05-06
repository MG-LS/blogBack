const Comment = require("../models/Comment.model");

module.exports.commentController = {
  addComment: async (req, res) => {
    try {
      const com = await Comment.create({
        text: req.body.text,
        user: req.body.user,
        blog: req.body.blog,
      });
      res.json(com);
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteComment: async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.json("Комментарий удален");
  },
  getComment: async (req, res) => {
    const get = await Comment.find();
    res.json(get);
  },
};
