const userServices = require("../service/User.services");
const User = require("../models/User.model");
const { validationResult } = require("express-validator");
const UserModel = require("../models/User.model");
const ApiError = require("../exceptions/api.error");

class UserController {
  async reg(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(`Ошибка валидации!`, errors.array()));
      }
      const { email, password, nickname, img, subscrib, subscript, blog } =
        req.body;
      const userData = await userServices.reg(
        email,
        password,
        nickname,
        img,
        subscrib,
        subscript,
        blog
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpyOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userServices.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpyOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userServices.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userServices.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userServices.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpyOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userServices.getAllUser();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async addImage(req, res) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        img: req.file.path,
      });
      const getImg = await User.findById(req.params.id);
      res.json(getImg);
    } catch (e) {
      res.json(`ошибка в юезр контроллерс адд имейдж ${e.toString()}`);
    }
  }
  async addSub(req, res, next) {
    try {
      // console.log(UserModel)
      await UserModel.findByIdAndUpdate(req.params.id, {
        $push: { subscrib: req.user.id },
      });
      await UserModel.findByIdAndUpdate(req.user.id, {
        $push: { subscript: req.params.id },
      });
      const getUser = await UserModel.findById(req.params.id);
      res.json(getUser);
    } catch (error) {
      next(error);
    }
  }
  async deleteSub(req, res, next) {
    try {
      await UserModel.findByIdAndUpdate(req.params.id, {
        $pull: { subscrib: req.user.id },
      });
      await UserModel.findByIdAndUpdate(req.user.id, {
        $pull: { subscript: req.params.id },
      });
      const deleteSub = await UserModel.findById(req.params.id);
      res.json(deleteSub);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
