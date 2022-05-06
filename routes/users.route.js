const Router = require("express");
const UserController = require("../controllers/users.controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const usersController = require("../controllers/users.controller");

router.post(
  "/reg",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 8 }),
  UserController.reg
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);
router.patch('/user/:id', authMiddleware, usersController.addSub);
router.delete('/user/:id', authMiddleware, usersController.deleteSub)

module.exports = router;
