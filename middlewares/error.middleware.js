const ApiError = require("../exceptions/api.error");

module.exports = function (errors, req, res, next) {
  console.log(errors);

  if (errors instanceof ApiError) {
    return res
      .status(errors.status)
      .json({ message: errors.message, errors: errors.errors });
  }
  return res.status(500).json({ message: "НЕПРЕДВИДЕННАЯ ОШИБКА ОТ СЕРВЕРА" });
};
