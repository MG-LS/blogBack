const Blog = require('../models/Blog.model')

module.exports.blogController = {
  getBlog: async (req, res) => {
    try {
      const data = await Blog.find()
      res.json(data)
    } catch (error) {
      res.json("Ошибка при выводе блога")
    }
  },

  addBlog: async (req, res) => {
    try {
      const data = await Blog.create({
        img: req.body.img,
        likes: req.body.likes,
        comm: req.body.comm,
        user: req.body.user,
        title: req.body.title,
        text: req.body.text,
      })
      return res.json(data)
    } catch (error) {
      res.json("Ошибка при создании блога")
    }
  },
  changeBlog: async (req, res) => {
    try {
      const prod = await Blog.findByIdAndUpdate(req.params.id, {
        img: req.body.img,
        likes: req.body.likes,
        user: req.body.user,
        title: req.body.title,
        text: req.body.text,
      });
      res.json(prod);
    } catch (err) {
      console.log({ error: "Ошибка при изменении блога" });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json("Блог удалено");
    } catch (err) {
      console.log(`${err} Ошибка при удалении блога`);
    }
  },
  addLike: async (req, res) => {
    try {
      await Blog.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.params.userId },
      });
      res.json("Лайк");
    } catch (err) {
      console.log(err);
    }
  },
  deleteLike: async (req, res) => {
    try {
      await Blog.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.params.userId },
      });
      res.json("Лайк убран");
    } catch (err) {
      console.log(err);
    }
  },
}