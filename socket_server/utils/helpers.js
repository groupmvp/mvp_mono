

module.exports = {
  findWinner: (obj1, obj2) => {
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
  },
  addToQueue: (q, newPlayer) => {
    const newQueue = [...q];
    newQueue.push(newPlayer);
    return newQueue;
  },
  checkAndUpdateQueuePlayers: (q, currentPlayers) => {
    if (q.length && !currentPlayers[1]) {
      currentPlayers[1] = q.shift();
    }
    if (q.length && !currentPlayers[2]) {
      currentPlayers[2] = q.shift();
    }
    return;
  },
  getPlayerNumber: (socketId, currentPlayers) => {
    for (let key in currentPlayers) {
      if (currentPlayers[key] === socketId) {
        return key;
      }
    }
    return 0;
  },
  removeDisconnector: (q, currentPlayers, socketId) => {
    for (let key in currentPlayers ) {
      if (currentPlayers[key] === socketId) {
        currentPlayers[key] = null;
      }
    }
    
    let index = q.indexOf(socketId);
    // console.log('should be -1 if not in queue -->', index);
    if (index >= 0) {
      q.splice(index, 1);
    }
    return;
  },
  handleRageQuit: (loserId, currentPlayers, io) => {
    let winner;
    for (let key in currentPlayers ) {
      if (currentPlayers[key] !== loserId) {
        winner = key;
      }
      if (currentPlayers[key] === loserId) {
        io.emit('winner', {
          winner,
          loser: key,
          isTie: false,
          winnerChoice: null,
          loserChoice: null,
        });
      }
    }
  },
};