var http = require('http')
  , path = require('path')
  , socketIO = require('socket.io')

const server = http.createServer();

const io = socketIO(server);

server.listen(3000, (err) => {
  if (err) {
    console.log('error listening on 3000', err);
  } else {
    console.log("Express server listening on port 3000");
  }
});

const players = { 1: null, 2: null };

io.sockets.on('connection', function (socket) {
  console.log('A new user connected!');
  if (!players[1]) {
    players[1] = socket.client.id;
  } else {
    players[2] = socket.client.id;
  }
  let playerNumber = 0;
  for (let key in players) {
    if (players[key] === socket.client.id) {
      playerNumber = key;
    }
  }
  socket.emit('playerHasConnected', { 
    msg: `Welcome to RPS Player ${playerNumber}`,
    socketId: socket.client.id,
    playerNumber,
  });

  socket.on('disconnect', () => {
    console.log('a player disconnected!');
    const disconnector = socket.client.id;
    for (let key in players ) {
      if (players[key] === disconnector) {
        players[key] = null;
      }
    }
  });

  socket.on('clicked', (data) => {
    console.log('from client -->', data);
    socket.emit('selection', { test: 'this somehow works' });
  });
});


module.exports = io;