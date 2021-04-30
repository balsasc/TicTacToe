const Game = (() => {
  const winCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  return { winCases };
})();

const Players = (name, turn, moves = []) => {
  return {name, turn, moves};
}

const gameBoard = (() => {
  const boardParts = document.querySelectorAll('.box');
  const playerX = Players("Player 1", true);
  const playerO = Players("Player 2", false);

  playerX.turn = true;

  const finalResult = () => {

    const { winCases } = Game;
    let result = undefined;

    for (let i = 0; i < winCases.length; i++) {
      if (winCases[i].every(r => playerX.moves.includes(r))) result = "p1";
    }

    for (let i = 0; i < winCases.length; i++) {
      if (winCases[i].every(r => playerO.moves.includes(r))) result = "p2";
    }

    if (playerX.moves.length === 5 && !result) result = "draw";
    return { result }
  };

  const declareResult = document.querySelector('.declare-result');
  const displayResult = () => {
    if (finalResult().result === "draw") {
      declareResult.classList.add('gray');
      declareResult.textContent = "It's a draw!";
    }
    else if (finalResult().result === "p1") {
      declareResult.classList.add('red');
      declareResult.textContent = `${playerX.name} has won!`;
    }
    else if (finalResult().result === "p2") {
      declareResult.classList.add('blue');
      declareResult.textContent = `${playerO.name} has won!`;
    }
  }
    
  for(let i = 0; i < boardParts.length; i++) {

    boardParts[i].addEventListener('click', () => {
      if(!finalResult().result){
        const x = '<i class="fas fa-times fa-6x"></i>';
        const o = '<i class="far fa-circle fa-5x"></i>';
  
        if (playerX.turn && boardParts[i].innerHTML === "") {
          boardParts[i].innerHTML = x;
          playerX.moves.push(i);
          playerO.turn = true;
          playerX.turn = false;
        }
    
        else if(playerO.turn && boardParts[i].innerHTML === "") {
          boardParts[i].innerHTML = o;
          playerO.moves.push(i);
          playerX.turn = true;
          playerO.turn = false;
        }
      }
      displayResult();
    })
  }

  const resetPlayers = () => {
    playerX.moves = []
    playerX.turn = true;
    playerO.moves = []
    playerO.turn = false;
    finalResult().result = undefined;
  }
  
  const resetStyle = () => {
    declareResult.textContent = "";
    declareResult.classList.remove('gray', 'blue', 'red');
  }

  const button = document.querySelector('.btn');
  button.addEventListener('click', () => {
    boardParts.forEach(part => part.innerHTML = "");
    resetPlayers();
    resetStyle();
  })

  return {playerX, playerO, boardParts, finalResult}
})();

const displayController = (() => {
  const {playerX, playerO, boardParts, finalResult} = gameBoard;

  const resetPlayers = () => {
    playerX.moves = []
    playerX.turn = true;
    playerO.moves = []
    playerO.turn = false;
    finalResult().result = undefined;
  }
  
  const resetStyle = () => {
    declareResult.textContent = "";
    declareResult.classList.remove('gray', 'blue', 'red');
  }

  const button = document.querySelector('.btn');
  button.addEventListener('click', () => {
    boardParts.forEach(part => part.innerHTML = "");
    resetPlayers();
    resetStyle();
  })
})();
