const workspace = document.querySelector(".chat-space");
const input = document.querySelector(".bottom_input .message");
const room = document.querySelector(".bottom_input .room");
const sendBtn = document.querySelector(".bottom_input .send");
const join = document.querySelector(".bottom_input .join");

import { io } from "socket.io-client";

const socket = io("http://localhost:3009");

socket.on("connect", () => {
  printScreen(`You have connected with ${socket.id}`, "green");

});

socket.on("recieve-message", (message) => {
  printScreen(message, "blue");
});

socket.on('recieve-typing', (name)=>{
    printScreen(`${name} start Typing`, "blue");
    console.log(`${name} start Typing`)
})

socket.on('stop-typing', (name)=>{
    printScreen(`${name} stop Typing`, "red");
    console.log(`${name} stop Typing`)
})

function sendMessage() {
  if (input.value.trim() == null) return;
  socket.emit("send-message", {
    message: input.value,
    room: room.value ? room.value : null,
  });
  printScreen(input.value, "red");
  input.value = null;
}

function joinRoom() {
  if (room.value.trim() == "") return;

  socket.emit("join-room", room.value, (res) => {
    printScreen(`${res}`);
    room.value = null;
  });
}

input.addEventListener('focus', (e)=>{
   socket.emit("user-typing", socket.id, room.value );

})

input.addEventListener('blur', (e)=>{
    socket.emit("stop-typing", socket.id, room.value );
})

// let C = 0;
// setInterval(() => {
//   socket.volatile.emit("ping", C++);
// }, 100);

sendBtn.addEventListener("click", sendMessage);
join.addEventListener("click", joinRoom);
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;

  if (e.key === "c") {
    socket.connect();
  }

  if (e.key === "d") {
    socket.disconnect();
  }
});

function printScreen(text, color) {
  const el = document.createElement("div");
  el.innerHTML = text;
  el.classList.add(color);
  workspace.appendChild(el);
}
