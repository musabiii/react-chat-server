const { createServer } = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const utilUsers = require("./utils/users");
const moment = require('moment');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors);

const server = createServer(app);
const io = socketio(server, {
  cors: {
    origin: "react-chat-client-three.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connect new");

  socket.emit("message", {
    username: "Bot",
    text: `you are Welcome!`,
    timestamp:moment().format('LTS')
  });

  socket.on("join", (user) => {
    utilUsers.addUser(socket.id, user.username, user.chatName);

    socket.join(user.chatName);
    io.to(user.chatName).emit("updateUsers", utilUsers.getUsers(user.chatName));

    socket.broadcast.to(user.chatName).emit("message", {
      username: "Bot",
      text: `${user.username} join to chat`,
      timestamp:moment().format('LTS')
    });
  });

  socket.on("chatMessage", (message) => {
    const user = utilUsers.getUser(socket.id);
    if (user) {
      // const timestamp = moment().calendar();
      message.timestamp = moment().format('LTS');
      console.log({ message });
      io.to(user.chatName).emit("message", message);
    }
  });

  socket.on("disconnect", (e) => {
    console.log("disconnect");
    const user = utilUsers.removeUser(socket.id);
    if (user) {
      io.to(user.chatName).emit(
        "updateUsers",
        utilUsers.getUsers(user.chatName)
      );
      io.to(user.chatName).emit("message", {
        username: "Bot",
        text: `${user.username} left the chat`,
      timestamp:moment().format('LTS')
      });
    }
  });
});

server.listen(PORT, () => console.log(`${PORT} is started`));
