let Gameboard = {
    gameboard: [[null, null, null], [null, null, null], [null, null, null]],
}

function createPlayer (symbolIn) {
    const symbol = symbolIn;
    let score = 0;

    const getScore = () => score;
    const incrementScore = () => score++;

    return {symbol, getScore, incrementScore};
}

function gameController() {
    let player1 = createPlayer('X');
    let player2 = createPlayer('O');

    function makeMove (x, y, player) {
        Gameboard.gameboard[x][y] = player.symbol;
    }

    let players = [player1, player2]; // Players stored in array
    let currentPlayerIndex = 0; // starts with player1(X)

    function gameStart(x, y) {
        let currentPlayer = players[currentPlayerIndex];
        
        if (Gameboard.gameboard[x][y] == null) {
            makeMove(x, y, currentPlayer);
            updateUI();
            currentPlayerIndex = (currentPlayerIndex + 1) % 2;   // switch to next player
        }
     
        console.log(Gameboard.gameboard);

        var winner = checkWinner(player1, player2);
        if (winner !== null) {
            setTimeout(() => {
                alert(`${winner.symbol} wins!`);
                winner.incrementScore();
                console.log(`${winner.symbol}'s score:"` + winner.getScore());
                resetGame();
            }, 100);
        } else if (checkIfFull()) {
            setTimeout(() => {
                alert("Draw");
                resetGame();
            }, 150)
        }
    }

    function resetGame() {
        currentPlayerIndex = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                Gameboard.gameboard[i][j] = null;
            }
        }
        updateUI();
    }
    
    return gameStart;
}

function checkIfFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (Gameboard.gameboard[i][j] == null) {
                return false;
            }
        }
    }
    return true;
}

function checkWinner(player1, player2) {
    let counter1, counter2;

    // Horizontal check
    for (let i = 0; i < 3; i++) {
        counter1 = 0;
        counter2 = 0;
        for (let j = 0; j < 3; j++) {
            if (player1.symbol === Gameboard.gameboard[i][j]) {
                counter1++;
            } else if (player2.symbol === Gameboard.gameboard[i][j]) {
                counter2++;
            }
        }
        if (counter1 === 3) {
            return player1;
        } else if (counter2 === 3) {
            return player2;
        }
    }

    // Vertical check
    for (let i = 0; i < 3; i++) {
        counter1 = 0;
        counter2 = 0;
        for (let j = 0; j < 3; j++) {
            if (player1.symbol === Gameboard.gameboard[j][i]) {
                counter1++;
            } else if (player2.symbol === Gameboard.gameboard[j][i]) {
                counter2++;
            }
        }
        if (counter1 === 3) {
            return player1;
        } else if (counter2 === 3) {
            return player2;
        }
    }

    // Diagonal check
    let center = Gameboard.gameboard[1][1];
    if (center !== null) {
        if (
            (Gameboard.gameboard[0][0] === center && Gameboard.gameboard[2][2] === center) ||
            (Gameboard.gameboard[2][0] === center && Gameboard.gameboard[0][2] === center)
        ) {
            return center === player1.symbol? player1: player2;
        }
    }

    return null;
}

/* DISPLAY LOGIC FOR THE GAME */

function displayController() {
    const gameboard = document.querySelector(".gameboard");

    const boardTileContainers = boardTilesContainerGenerator(); // make buttons for the gameboard
    addTilesToGameboard(gameboard, boardTileContainers); // add the buttons to the gameboard
}

function updateUI() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let tile = document.querySelector(`[data-x="${i}"][data-y="${j}"]`);
            if (Gameboard.gameboard[i][j] == 'X') {
                tile.classList.add("cross");
            } else if (Gameboard.gameboard[i][j] == 'O') {
                tile.classList.add("circle");
            } else {
                tile.className = "board-tile";
            }
        }
    }
}

function addTilesToGameboard(gameboard, boardTileContainers) {
    for (let i = 0; i < boardTileContainers.length; i++) {
        gameboard.append(boardTileContainers[i]);
    }
}

const playGame = gameController();
function boardTilesContainerGenerator() {
    let boardTileContainers = [];
    for (let i = 0; i < 9; i++) {
        const boardTileContainer = document.createElement("div");
        const boardTile = document.createElement("div");
        const edge = document.createElement("div");
        const shadow = document.createElement("div");

        boardTileContainer.className = "board-tile-container";
        boardTile.className = "board-tile";
        shadow.className = "shadow";

        let x = Math.floor(i / 3); // Row index
        let y = i % 3; // Column index

        boardTile.setAttribute("data-x", "" + x);
        boardTile.setAttribute("data-y", "" + y);

        boardTile.addEventListener("click", function() {
            let tileX = parseInt(this.getAttribute("data-x"));
            let tileY = parseInt(this.getAttribute("data-y"));

            playGame(tileX, tileY);
        })
        boardTileContainer.append(boardTile);
        boardTileContainer.append(edge);
        boardTileContainer.append(shadow);

        boardTileContainers.push(boardTileContainer);
    }
    return boardTileContainers;
}

document.addEventListener("DOMContentLoaded", displayController);