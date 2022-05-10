const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(require("./routes/users.route"));
app.use(require("./routes/blogs.route"));

app.use(errorMiddleware);
app.use("/image", express.static(path.resolve(__dirname, "image")));

mongoose
  .connect(
    "mongodb+srv://mgls:46325899@cluster0.od801.mongodb.net/Blog"
  )
  .then(() => console.log("Успешное соединение..."))
  .catch(() => console.log("Пал хила"));

app.listen(PORT, () => {
  console.log("Сервер запущен на http://localhost:8000/");
});
