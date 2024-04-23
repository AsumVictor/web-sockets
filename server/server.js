const socketIO = require("socket.io");
const io = socketIO(4000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  console.log(`New connection with ID: ${socket.id}`);

  socket.on("custom-event", (data) => {
    console.log(data.name);
  });

});
