
var socket = io.connect('http://localhost:3000'); 

const selectionMap = {
  1: 'rock',
  2: 'paper',
}

let state = 0;
let socketId = '';
let queue = [];
// if we get an "info" emit from the socket server then console.log the data we receive
const game = document.getElementById('game');
<<<<<<< HEAD
socket.on('playerHasConnected', function (data) {
    state = data.playerNumber;
    socketId = data.socketId;
    console.log(data);
=======
socket.on('info', function (data) {
    console.log(data, 'helloo');
>>>>>>> 76eda5f26ad23d2e342f9207eb2898d170580f56
    let node = document.createElement('div');
    node.textContent = data.msg;
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


