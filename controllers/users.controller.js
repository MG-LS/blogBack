const userServices = require("../service/User.services");
const User = require("../models/User.model");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");

class UserController {
  async reg(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(`Ошибка валидации!`, errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userServices.reg(email, password);
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
}

module.exports = new UserController();
