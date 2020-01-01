var socket = io.connect("http://localhost:9090");

var message = document.querySelector("#message");
var handle = document.querySelector("#handle");
var sendButton = document.querySelector("#send");
var joinButton = document.querySelector('#join');
var output  = document.querySelector("#output");
var feedback = document.querySelector("#feedback");
var to = document.querySelector("#to");

sendButton.addEventListener("click", function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
    to: to.value
  });
  message.value = '';
});

joinButton.addEventListener("click", function() {
  socket.emit('join', {
    handle: handle.value
  });
  // enable the message and the Send button
  message.disabled = false;
  sendButton.disabled = false;
  to.disabled = false;
});

message.addEventListener("keypress", function() {
  socket.emit("typing", handle.value);    // send this to the server
});

socket.on('chat', function(data) {
  output.innerHTML += "<p><strong>" + data.handle +":</strong>" + data.message + "</p>";
  feedback.innerHTML = "";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p> <em>" + data + " is typing a message...</em> </p>";
});
