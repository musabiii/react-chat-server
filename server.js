const { createServer } = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const utilUsers = require("./utils/users");

const app = express();
app.use(cors);

const server = createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connect new");

  socket.on("join", (user) => {
    utilUsers.addUser(socket.id, user.username, user.chatName);

    socket.join(user.chatName);
    io.to(user.chatName).emit("updateUsers",utilUsers.getUsers(user.chatName))
    socket.broadcast.to(user.chatName).emit("message", {
      username: "Bot",
      text: `${user.username} join to chat`,
    });
  });

  socket.on("chatMessage", (message) => {
    const user = utilUsers.getUser(socket.id);
    if (user) {
      console.log({ message });
      io.to(user.chatName).emit("message", message);
    }
  });

  socket.on("disconnect", (e) => {
    const user = utilUsers.removeUser(socket.id);
    if (user) {
      io.to(user.chatName).emit("updateUsers",utilUsers.getUsers(user.chatName))
      io.to(user.chatName).emit("message", {
        username: "Bot",
        text: `${user.username} left the chat`,
      });
    }
  });
});

server.listen(3000, () => console.log("3000 is started"));
