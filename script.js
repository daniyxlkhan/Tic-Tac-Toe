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

        let tile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (tile) {
            tile.classList.add(player.symbol === 'X'? 'board-tile-marked-cross': 'board-tile-marked-circle');
        }
    }

    let players = [player1, player2]; // Players stored in array
    let currentPlayerIndex = 0; // starts with player1(X)

    function gameStart(x, y) {
        let currentPlayer = players[currentPlayerIndex];

        makeMove(x, y, currentPlayer);
     
        console.log(Gameboard.gameboard);

        let winner = checkWinner(player1, player2);
        if (winner !== null) {
            alert(`${winner.symbol} wins!`);
            winner.incrementScore();
            resetGame();
        }

        if (checkIfFull()) {
            alert("Draw");
            resetGame();
        }
        // switch to next player
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    }

    return gameStart;
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            Gameboard.gameboard[i][j] = null;
        }
    }
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
            return center;
        }
    }

    return null;
}

/* DISPLAY LOGIC FOR THE GAME */

function displayController() {
    const gameboard = document.querySelector(".gameboard");
    
    const boardTiles = boardTilesGenerator(); // make buttons for the gameboard
    addTilesToGameboard(gameboard, boardTiles); // add the buttons to the gameboard
}

function addTilesToGameboard(gameboard, boardTiles) {
    for (let i = 0; i < boardTiles.length; i++) {
        gameboard.append(boardTiles[i]);
    }
}

const playGame = gameController();

function boardTilesGenerator() {
    let boardTiles = [];
    for (let i = 0; i < 9; i++) {
        const boardTile = document.createElement("div");
        boardTile.classList.add("board-tile")

        let x = Math.floor(i / 3); // Row index
        let y = i % 3; // Column index

        boardTile.setAttribute("data-x", "" + x);
        boardTile.setAttribute("data-y", "" + y);

        boardTile.addEventListener("click", function() {
            let tileX = parseInt(this.getAttribute("data-x"));
            let tileY = parseInt(this.getAttribute("data-y"));

            playGame(tileX, tileY);
        })
        boardTiles.push(boardTile);
    }
    return boardTiles;
}

document.addEventListener("DOMContentLoaded", displayController);








