const socketIO = require("socket.io");
const io = socketIO(4000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  console.log(`New connection with ID: ${socket.id}`);

  socket.on("send-message", (message) => {
     socket.broadcast.emit("recieve-message", message);
  });

});
