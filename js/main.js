/*----CONSTANTS----*/
const lookup = {
  '1': 'black',
  '-1': 'white',
  'null': ''
};

const winningTable = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*==== VARIABLES ====*/
let board, turn, winner;

/*==== CACHED ELEMENT REFERENCES ====*/
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h2');

/*==== EVENT LISTENERS ====*/
document.querySelector('table').addEventListener('click', advTurn);
document.querySelector('button').addEventListener('click', initialize);

/*==== FUNCTIONS ====*/

initialize();

//Determines who's turn it is at the given point once a move is made.

function advTurn(evt) {
  const idx = parseInt(evt.target.id.replace('sq', ''));
  if (board[idx] || winner) return;
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

// winning information. Checks to see if one of the winning table combinations are true 
function getWinner() {
  for (let i = 0; i < winningTable.length; i++) {
    if (Math.abs(board[winningTable[i][0]] + board[winningTable[i][1]] + board[winningTable[i][2]]) === 3) return board[winningTable[i][0]];
  }
  if (board.includes(null)) return null;
  return 'T';
}


//
function render() {
  board.forEach(function(sq, idx) {
    squares[idx].style.background = lookup[sq];
  });
  if (winner === 'T') {
    message.innerHTML = 'There is a tie! Please try again!';
  } else if (winner) {
    message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
  } else {
    message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
  }
}

//when the button is reset or once page is loaded up again
function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}