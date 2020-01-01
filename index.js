var express = require('express');
var app = express();
var socket = require("socket.io");

app.use(express.static("public"));

var socketMap = {};

var server = app.listen(9090, function () {
  console.log("Listening on port 9090");
});

var io = socket(server);

io.on("connection", function(socket){
  console.log("Socket connection made. Socket ID is : " + socket.id);

  socket.on('chat', function(data) {
    // data has the message and it also has the 'to' value
    // rather than emitting to all sockets, emit to only the one for the user
    // io.sockets.emit('chat', data);
    socketMap[data.to].emit('chat', data);
  });

  socket.on('join', function(data) {
    // this is where we put this into a map
    console.log("Storing Socket ID : " + socket.id);
    socketMap[data.handle] = socket;
    console.log(socketMap);
  });

  socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);    // this will go to all clients except the one sending
    });
});
