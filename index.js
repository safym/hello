const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var users = {};

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  // io.emit('connectionUser');
  socket.on('disconnect', () => {
    delete users[socket.id];
    // io.emit('disconnectUser');
    console.log(users)
  });

  socket.on('login', function(data){
    console.log('a user ' + data.userName + ' connected');
    if (!users[socket.id]) {
      users[socket.id] = data.userName;
    }

    console.log(users)
    io.emit('user connected', users);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000/');
});