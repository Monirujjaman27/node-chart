const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const messageFromet = require("./utils/MessageFromet");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const hostName = "Boot";
io.on("connection", (socket) => {
  console.log("new ws connection .....");
  socket.emit("message", messageFromet(hostName, "welcome to chat app"));
  //run when user has been connect
  socket.broadcast.emit(
    "message",
    messageFromet(hostName, "a user has been connect")
  );
  //run when user has been disconnect
  socket.on("disconnect", () => {
    io.emit(
      "message",
      messageFromet(hostName, "A user has been left from the chart")
    );
  });

  //listen list from the chaet app
  socket.on("chartMessage", (msg) => {
    io.emit("message", messageFromet(hostName, msg));
  });
});
//set static forlder

app.use(express.static(path.join(__dirname, "public")));

const port = 3000 || process.env.PORT;
server.listen(port, () => console.log(`Server is running on port ${port}`));
