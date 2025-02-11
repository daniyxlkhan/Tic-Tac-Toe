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

    return {player1, player2, makeMove}
}

function gameLoop() {
    let game = gameController();
    let temp = 0;
    while (true) {
        let x,y;
        if (temp % 2 === 0) {
            temp++;
            x = parseInt(prompt("X's turn (enter x coordinate)"));
            y = parseInt(prompt("X's turn (enter y coordinate)"));
            game.makeMove(x, y, game.player1);
            console.log(Gameboard.gameboard);
        } else {
            temp++;
            x = parseInt(prompt("O's turn (enter x coordinate)"));
            y = parseInt(prompt("O's turn (enter y coordinate)"));
            game.makeMove(x, y, game.player2);
            console.log(Gameboard.gameboard);
        }


        let winner = checkWinner();
        if (winner !== null) {
            alert(`${winner} wins!`);
            break;
        }

        if (checkIfFull()) {
            alert("Draw");
            break;
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

function checkWinner() {
    let counterX, counterO;

    // Horizontal check
    for (let i = 0; i < 3; i++) {
        counterX = 0;
        counterO = 0;
        for (let j = 0; j < 3; j++) {
            if ('X' === Gameboard.gameboard[i][j]) {
                counterX++;
            } else if ('O' === Gameboard.gameboard[i][j]) {
                counterO++;
            }
        }
        if (counterX === 3) {
            return 'X';
        } else if (counterO === 3) {
            return 'O';
        }
    }

    // Vertical check
    for (let i = 0; i < 3; i++) {
        counterX = 0;
        counterO = 0;
        for (let j = 0; j < 3; j++) {
            if ('X' === Gameboard.gameboard[j][i]) {
                counterX++;
            } else if ('O' === Gameboard.gameboard[j][i]) {
                counterO++;
            }
        }
        if (counterX === 3) {
            return 'X';
        } else if (counterO === 3) {
            return 'O';
        }
    }

    // Diagonal check
    let center = Gameboard.gameboard[1][1];

    if (center !== null) {
        if (
            (Gameboard.gameboard[0][0] === center && Gameboard.center[2][2] === center) ||
            (Gameboard.gameboard[2][0] === center && Gameboard.center[0][2] === center)
        ) {
            return center;
        }
    }

    return null;
}


gameLoop();







