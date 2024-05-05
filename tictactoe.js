const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset');
const message = document.querySelector('.message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = parseInt(e.target.getAttribute('data-index'));
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      message.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (checkDraw()) {
      message.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return gameBoard[index] === player;
    });
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  message.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
