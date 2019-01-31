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
const choices = { 1: null, 2: null };

const findWinner = (obj1, obj2) => {
  const champ = {
    winner: null,
    loser: null,
    isTie: false,
    winnerChoice: '',
    loserChoice: '',
  };

  if (obj1.selection === 'rock') {
    if (obj2.selection === 'rock') {
      champ.isTie = true;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'rock';
    } else if (obj2.selection === 'paper') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'rock';
    } else if (obj2.selection === 'scissors') {
      // scissors
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'scissors';
    }
  }
  if (obj1.selection === 'paper') {
    if (obj2.selection === 'rock') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'rock';
    } else if (obj2.selection === 'paper') {
      champ.isTie = true;
      champ.winnerChoice = 'paper';
      champ.loserChoice = 'paper';
    } else if (obj2.selection === 'scissors') {
      // scissors
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'paper';
    }
  }
  if (obj1.selection === 'scissors') {
    if (obj2.selection === 'rock') {
      champ.winner = obj2.playerNumber;
      champ.loser = obj1.playerNumber;
      champ.winnerChoice = 'rock';
      champ.loserChoice = 'scissors';
    } else if (obj2.selection === 'paper') {
      champ.winner = obj1.playerNumber;
      champ.loser = obj2.playerNumber;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'paper';
    } else if (obj2.selection === 'scissors') {
      // scissors
      champ.isTie = true;
      champ.winnerChoice = 'scissors';
      champ.loserChoice = 'scissors';
    }
  }
  return champ;
};

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

  if (players[1] && players[2]) {
    io.emit('bothPlayersReady', { message: 'Both players are connected!'});
  }

  socket.on('disconnect', () => {
    console.log('a player disconnected!');
    const disconnector = socket.client.id;
    for (let key in players ) {
      if (players[key] === disconnector) {
        players[key] = null;
      }
    }
  });

  socket.on('selection', (data) => {
    console.log('from client -->', data);
    choices[data.playerNumber] = {...data};
    let result = null;
    if (choices[1] && choices[2]) {
      result = findWinner(choices[1], choices[2]);
      choices[1] = null;
      choices[2] = null;
    }
    if (result) {
      io.emit('winner', result);
    }
  });
});


module.exports = io;