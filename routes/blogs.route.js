const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { blogController } = require("../controllers/blogs.controller");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.post("/blog", fileMiddleware.single('img'), blogController.addBlog);
router.get("/blog", blogController.getBlog);
router.patch("/blog/:id", blogController.changeBlog);
router.delete("/blog/:id", blogController.deleteBlog);
router.patch("/like/:id",  blogController.addLike);
router.patch("/like/delete/:id", blogController.deleteLike);


module.exports = router;
