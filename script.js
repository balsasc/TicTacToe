const Players = () => {
  const moves = [];
  let turn = false;

  return {moves, turn};
}

const gameBoard = (() => {
  const boardParts = document.querySelectorAll('.box');
  const playerX = Players();
  const playerO = Players();
  
  playerX.turn = true;

  boardParts.forEach(part => {
    part.addEventListener('click', () => {
      const x = '<i class="fas fa-times fa-6x"></i>';
      const o = '<i class="far fa-circle fa-5x"></i>';
  
      if (playerX.turn && part.innerHTML === "") {
        part.innerHTML = x;
        playerO.turn = true;
        playerX.turn = false;
      }
  
      else if(playerO.turn && part.innerHTML === "") {
        part.innerHTML = o;
        playerX.turn = true;
        playerO.turn = false;
      }
    })
  })

  return {playerX, playerO, boardParts}
})();