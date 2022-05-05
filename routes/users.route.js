const Router = require("express");
const UserController = require("../controllers/users.controller");
const fileMiddleware = require("../middlewares/file.middleware");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/reg",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 8 }),
  UserController.reg
);
router.patch(
  "/img/:id",
  fileMiddleware.single("avatar"),
  UserController.addImage
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);

module.exports = router;
