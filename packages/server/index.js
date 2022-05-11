const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 5000;

io.sockets.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", (roomToken) => {
    socket.join(roomToken);
    io.sockets.to(roomToken).emit('joinRoomStatus', roomToken, true);
    console.log(`client ${socket.id} has joined room ${roomToken}`);
  });

  socket.on("roomChat", (roomToken, message) => {
    socket.to(roomToken).emit('chatMessage', message);
  });

  socket.on("videoControlRequest", (roomToken, isPlay) => {
    io.sockets.to(roomToken).emit('videoControl', isPlay);
  });

  socket.on("addToPlaylist", (roomToken, videoId) => {
    io.sockets.to(roomToken).emit("addToPlaylist", videoId);
  });

  socket.on("sendVideoToScreen", (roomToken, videoId) => {
    io.sockets.to(roomToken).emit("changeVideo", videoId);
  })

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

app.get('*', (req, res) => {
  console.log('not doing nothing right now!');
})

server.listen(port, () => {
  console.log(`Example app listening at port http://localhost:${port}`);
});
