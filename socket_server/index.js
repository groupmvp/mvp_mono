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

let playerCount = 0;

io.sockets.on('connection', function (socket) {
  console.log('A new user connected!');
  playerCount += 1;
  socket.emit('info', { msg: `Welcome to RPS Player ${playerCount}` });

  socket.on('disconnect', () => {
    console.log('player has disconnected');
    playerCount -= 1;
  });
});


module.exports = io;