
var socket = io.connect('http://localhost:3000'); 

const selectionMap = {
  1: 'rock',
  2: 'paper',
}

let state = 0;
let socketId = '';
// if we get an "info" emit from the socket server then console.log the data we receive
const game = document.getElementById('game');
socket.on('playerHasConnected', function (data) {
    state = data.playerNumber;
    socketId = data.socketId;
    console.log(data);
    let node = document.createElement('div');
    node.textContent = data.msg;
    game.appendChild(node);
});

const button = document.getElementById('selection');

const sendSelection = () => {
  socket.emit('clicked', {
    socketId,
    playerNumber: state, 
    selection: selectionMap[state], 
  });
}

socket.on('selection', (data) => {
  console.log('from socket, on selection event -->', data);
});

socket.on('bothPlayersReady', (data) => {
  console.log('ready -->', data);
});

