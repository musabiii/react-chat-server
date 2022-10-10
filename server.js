const { createServer } = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors);

const server = createServer(app);
const io = socketio(server,{
    cors:{
        origin:"http://127.0.0.1:5173",
        methods:["GET","POST"]
    }
});

io.on("connection", (socket) => {
  console.log("connect");
  socket.emit("message","connect success")

  socket.on("console",msg=>{
    console.log({msg})
  })

});




server.listen(3000, () => console.log("3000 is started"));
