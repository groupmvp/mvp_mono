

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
};