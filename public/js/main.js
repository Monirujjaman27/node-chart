const chartForm = document.getElementById("chat-form");
const chartMessages = document.querySelector(".chat-messages");

const socket = io();
//get message from server
socket.on("message", (message) => {
  console.log(message);
  messageOutput(message);
  //   scroll down
  chartMessages.scrollTop = chartMessages.scrollHeight;
});

// submit message chart from
chartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get message ui form
  const msg = e.target.elements.msg;
  //emit message from the server
  socket.emit("chartMessage", msg.value);
  //   clear input
  msg.value = "";
  msg.focus();
});

// message output
function messageOutput(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
  <p class="meta">${msg.user} <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>`;
  chartMessages.appendChild(div);
}
