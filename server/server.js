const socketIO = require("socket.io");
const io = socketIO(4000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  console.log(`New connection with ID: ${socket.id}`);

  socket.on("send-message", ({ message, room }) => {
    if (room == null) {
      socket.broadcast.emit("recieve-message", message);
    } else {
      socket.to(room).emit("recieve-message", message);
    }
  });

  socket.on("join-room", (room, callback) => {
    socket.join(room);
    callback("You have join the room");
  });

  socket.on("user-typing", (name, room) => {
    console.log(`${name} Start Typing...`);
    socket.broadcast.emit("recieve-typing", name);
  });

  socket.on("stop-typing", (name, room) => {
    console.log(`${name} stop Typing...`);
    socket.broadcast.emit("stop-typing", name);
  });
});
