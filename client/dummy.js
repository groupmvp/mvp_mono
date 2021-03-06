
var socket = io.connect('http://localhost:3000'); 

const selectionMap = {
  1: 'rock',
  2: 'paper',
}

let state = 0;
let socketId = '';
let queue = [];
let hasUsername = false;
let username = '';

const handlePrompt = () => {
  username = prompt('Please choose a username rookie', 'Your not gud');
};
// if we get an "info" emit from the socket server then console.log the data we receive
const game = document.getElementById('game');
socket.on('playerHasConnected', function (data) {
    if (!username) {
      handlePrompt();
    }
    state = data.playerNumber;
    socketId = data.socketId;
    console.log(data);
    let node = document.createElement('div');
    node.textContent = data.msg + ` ${username}`;
    game.appendChild(node);
});

const button = document.getElementById('selection');

const sendSelection = () => {
  socket.emit('selection', {
    socketId,
    playerNumber: state, 
    selection: selectionMap[state], 
  });
}

socket.on('winner', (data) => {
  console.log('from socket, on winner event -->', data);

  // send back a new game request
  socket.emit('newGame', { socketId });

});

socket.on('bothPlayersReady', (data) => {
  console.log('ready -->', data);
});

socket.on('queue', (data) => {
  queue = data.queue;
  console.log('this is the updated queue -->', queue);
});


