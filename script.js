const playerRed = "R";
const playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let columns = 7;

window.onload = () => {
    setGame();
  };

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5]; //keeps track of which row each column is at.

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push(" ");

      // HTML
      // <div id='0-0' class='tile'></div>
      let tile = document.createElement("div");
      tile.id = `${r.toString()} - ${c.toString()}`;
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("-"); // '0-0' => [0,0]

  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currPlayer;
  let tile = document.getElementById(`${r.toString()} - ${c.toString()}`);
  console.log('tile', tile);
  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }
  r -= 1; // updating the row height for the column
  currColumns[c] = r;

  checkWinner()
}

function checkWinner () {
    // sliding window checking 

    // horizontally 

    for (let r = 0; r < rows; r++) {
        for(let c = 0; c < columns - 3; c++) { 
            // check there ahaead without going out of bound
            if(board[r][c] != '') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }

        } 
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}