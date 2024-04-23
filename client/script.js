const workspace = document.querySelector(".chat-space");
const input = document.querySelector(".bottom_input input");
const sendBtn = document.querySelector(".bottom_input button");
import { io } from "socket.io-client";

const socket = io('http://localhost:4000');

socket.on("connect", () => {
    printScreen(`You have connected with ${socket.id}`, 'green')

    socket.emit("send-message", {
        name: "Asum Victor",
    })
})



function printScreen(text, color){
  const el = document.createElement("div");
  el.innerHTML = text;
  el.classList.add(color);
  workspace.appendChild(el);
}
