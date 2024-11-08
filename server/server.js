const express = require('express');
const app = express();
const http = require("http"); // just recommended way of creating server using socket.io
const cors = require("cors");
const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, { // give the server and then cors function inside
  cors:{
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => { // "connection" for when user connects
  console.log("User Connected: " + socket.id)

  socket.on("send_message", (data) => {
    // socket.broadcast.emit("receive_message", data) // sends to everyoen but self
    socket.to(data.room).emit("receive_message", data) // sends to everyone in same room
  })

  socket.on("join_room", (data) => {
    socket.join(data)
  })

 // Disconnect listener
 io.on('disconnect', function() {
  console.log('Client disconnected.');
});
}) 

server.listen(3001, () => {
  console.log("Server is running...")
})
