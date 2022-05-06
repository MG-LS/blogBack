const { Router } = require("express");

const { blogController } = require("../controllers/blogs.controller");

const router = Router();

router.post("/blog", blogController.addBlog);
router.get("/blog", blogController.getBlog);
router.patch("/blog/:id", blogController.changeBlog);
router.delete("/blog/:id", blogController.deleteBlog);

module.exports = router;
