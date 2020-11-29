var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const port = 3000;

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("Chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
