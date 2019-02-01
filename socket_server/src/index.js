var http = require('http')
  , path = require('path')
  , socketIO = require('socket.io');

const { 
  findWinner, 
  addToQueue, 
  checkAndUpdateQueuePlayers, 
  getPlayerNumber,
  removeDisconnector,
  handleRageQuit,
} = require('../utils/helpers');

const server = http.createServer();

const io = socketIO(server);

server.listen(3000, (err) => {
  if (err) {
    console.log('error listening on 3000', err);
  } else {
    console.log("Express server listening on port 3000");
  }
});

let queue = [];
const players = { 1: null, 2: null };
const choices = { 1: null, 2: null };


io.sockets.on('connection', function (socket) {
  console.log('A new user connected!');
  
  // add new player to queue
  queue = addToQueue(queue, socket.client.id);

  

  // logic for assigning players to 1 and 2
  // console.log('current queue after player added -->', queue);
 
  checkAndUpdateQueuePlayers(queue, players);

  // updated queue so send it to client
  io.emit('queue', { queue });

  // console.log('queue after player is assigned -->', queue);
  // console.log('players after a player is assigned -->', players);


  // // give this user the correct player number

  let playerNumber = getPlayerNumber(socket.client.id, players);


  // telling the client which player she is
  // by passing playerNumber to the message object going to the client
  socket.emit('playerHasConnected', { 
    msg: `Welcome to RPS Player ${playerNumber}`,
    socketId: socket.client.id,
    playerNumber,
  });

  if (players[1] && players[2]) {
    io.emit('bothPlayersReady', { message: 'Both players are connected!'});
  }

  socket.on('disconnect', () => {
    console.log('a player disconnected!');

    const disconnector = socket.client.id;
    // console.log('this should be gone from Q and Players -->', disconnector);

    handleRageQuit(disconnector, players, io);
    
    removeDisconnector(queue, players, disconnector);
    // console.log('queue after disconnect -->', queue);
    // console.log('players after disconnect -->', players);
    checkAndUpdateQueuePlayers(queue, players);

    // updated queue so send it to client
    io.emit('queue', { queue });

    // console.log('queue after disconnect and update -->', queue);
    // console.log('players after disconnect and update -->', players);

  });

  socket.on('selection', (data) => {
    // console.log('from client -->', data);
    choices[data.playerNumber] = {...data};
    let result = null;
    if (choices[1] && choices[2]) {
      result = findWinner(choices[1], choices[2]);
      choices[1] = null;
      choices[2] = null;
    }
    if (result) {
      io.emit('winner', result);
      // console.log('notice me! notice me!');
      let loser = players[result.loser];
      // console.log('loser -->', loser);
      players[result.loser] = null;
      // console.log('reassign pleyers -->', players);
      checkAndUpdateQueuePlayers(queue, players);
      
      queue = addToQueue(queue, loser);

      
      // console.log('loser added to the queue -->', queue);
      console.log('updated queue and players -->', queue, players);
      checkAndUpdateQueuePlayers(queue, players);

      // updated queue so send it to client
      io.emit('queue', { queue });
    }
  });

  // listen for new game request
  socket.on('newGame', (data) => {
    console.log('this player has requested new game info -->', data);
    let newPlayerNumber = getPlayerNumber(data.socketId, players);
    socket.emit('playerHasConnected', { 
      msg: `Welcome to RPS Player ${newPlayerNumber}`,
      socketId: data.socketId,
      playerNumber: newPlayerNumber,
    });
  });
});


// module.exports = io;