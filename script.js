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
        } else {
            temp++;
            x = parseInt(prompt("O's turn (enter x coordinate)"));
            y = parseInt(prompt("O's turn (enter y coordinate)"));
            game.makeMove(x, y, game.player2);
        }

        let winner = checkWinner();
        if (winner !== null) {
            alert(`${winner} wins!`);
            break;
        }
    }
}

function checkWinner() {
    let counterX = 0;
    let counterY = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ('X' === Gameboard.gameboard[i][j]) {
                counterX++;
            } else {
                counterY++;
            }
        }
        if (counterX === 3) {
            return 'X';
        } else if (counterY === 3) {
            return 'O';
        }
        counterX = 0;
        counterY = 0;
    }

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            if ('X' === Gameboard.gameboard[i][j]) {
                counterX++;
            } else {
                counterY++;
            }
        }
        if (counterX === 3) {
            return 'X';
        } else if (counterY === 3) {
            return 'O';
        }
        counterX = 0;
        counterY = 0;
    }

    return null;
}


gameLoop();

console.log(Gameboard.gameboard);





