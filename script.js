const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

let isCircleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  statusMessage.textContent = '';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'O' : 'X';
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    statusMessage.textContent = `${currentClass} Wins!`;
    endGame();
  } else if (isDraw()) {
    statusMessage.textContent = `It's a Draw!`;
    endGame();
  } else {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
  }
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function setBoardHoverClass() {
  board.classList.remove('X');
  board.classList.remove('O');
  board.classList.add(isCircleTurn ? 'O' : 'X');
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}
