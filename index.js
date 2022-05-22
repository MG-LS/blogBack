const express = require("express");
const mongoose = require("mongoose");
// const useSocket = require("socket.io");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8000",
  },
});

require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(require("./routes/users.route"));
app.use(require("./routes/blogs.route"));
app.use(require("./routes/comments.route"));
app.use(require("./routes/reviews.route"));
app.use(require("./routes/comments.route"));
app.use(require("./routes/conversations.route"));
app.use(require("./routes/messages.route"));

app.use(errorMiddleware);
app.use("/image", express.static(path.resolve(__dirname, "image")));

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.nxclk.mongodb.net/autorizationTS?authSource=admin&replicaSet=atlas-pzfzfv-shard-0&readPreference=primary&ssl=true"
  )
  .then(() => console.log("Успешное соединение..."))
  .catch(() => console.log("Пал Бу"));

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(PORT, () => {
  console.log("Сервер запущен на http://localhost:8000/");
});
