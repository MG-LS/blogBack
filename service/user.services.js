const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailServices = require("./mail.services");
const tokenServices = require("./token.services");
const UserDto = require("../dtos/user.dto");
const ApiError = require("../exceptions/api.error");

class UserService {
  async reg(
    email,
    password,
    nickname,
    img,
    subscrib,
    subscript,
    profileStatus,
    blog
  ) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким ${email} уже существует!`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      nickname,
      profileStatus,
      img,
      subscrib,
      subscript,
      blog,
      activationLink,
    });

    await mailServices.sendActivationMail(
      email,
      `${process.env.API_URL}/activate/${activationLink}`
    );

    const userDto = new UserDto(user);

    const tokens = tokenServices.generateToken({ ...userDto });
    await tokenServices.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(
        "ОШИБКА: Пользователь с таким E-mail не найден!"
      );
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("ОШИБКА: Неверный пароль!");
    }
    const userDto = new UserDto(user);
    const tokens = tokenServices.generateToken({ ...userDto });

    await tokenServices.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenServices.remoteToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenServices.valideRefreshToken(refreshToken);
    const tokenFromDb = await tokenServices.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = tokenServices.generateToken({ ...userDto });
    await tokenServices.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUser() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
