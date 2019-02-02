
var socket = io.connect('http://localhost:3000'); 

// if we get an "info" emit from the socket server then console.log the data we receive
const game = document.getElementById('game');
socket.on('info', function (data) {
    console.log(data);
    let node = document.createElement('div');
    node.textContent = data.msg;
    game.appendChild(node);
});
