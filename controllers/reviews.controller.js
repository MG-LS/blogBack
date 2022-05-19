const Review = require("../models/Review.model");

module.exports.reviewsController = {
  addReview: async (req, res) => {
    try {
      const review = await Review.create({
        user: req.body.user,
        text: req.body.text,
        rating: req.body.rating,
      });
      res.json(review);
    } catch (error) {
      res.json(`Не удалось добавить отзыв: ${error.message}`);
    }
  },
  deleteReview: async (req, res) => {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.json("Отзыв удален");
    } catch (error) {
      res.json(`Не удалось удалить отзыв: ${error.message}`);
    }
  },
  getReviews: async (req, res) => {
    try {
      const allReviews = await Review.find().populate("user");
      res.json(allReviews);
    } catch (error) {
      res.json(`Не удалось получить список отзывов: ${error.message}`);
    }
  },
};
