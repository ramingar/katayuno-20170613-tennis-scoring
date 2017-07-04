import test from 'tape';

const Score = function () {
    const scoreConversion = {0: 0, 1: 15, 2: 30, 3: 40, 'adv': 'advantage'};
    let points = 0;
    let games = 0;
    let rival = null;

    const setRival = function (r = Score()) {
        rival = r;
    };

    const addGame = function () {
        games = games + 1;
        resetPoints();
    };

    const addPoint = function () {
        points = points + 1;
    };

    const getPoints = function () {
        return points;
    };

    const getGames = function () {
        return games;
    };

    const resetPoints = function () {
        points = 0;
    };

    const show = function () {
        let auxPoints = points;
        if (points > 3) {
            if (points > rival.getPoints()) {
                auxPoints = 'adv';
            } else {
                auxPoints = 3;
            }
        }

        return scoreConversion[auxPoints];
    };
    return {setRival, addPoint, getPoints, resetPoints, addGame, getGames, show};
};

// Component to test
const Tennis = function () {
    const player1 = Score();
    const player2 = Score();
    const players = [player1, player2];
    const PLAYER_1 = 0;
    const PLAYER_2 = 1;

    player1.setRival(player2);
    player2.setRival(player1);

    const resetGame = function () {
        players[PLAYER_1].resetPoints();
        players[PLAYER_2].resetPoints();
    };

    const checkMatchResult = function () {

        const playerWinner = players.reduce((acc, player) => {
            if (players.some((otherPlayer) => playerWin(player, otherPlayer))) {
                acc = player;
            }
            return acc;
        }, null);

        if (playerWinner !== null) {
            addGame(playerWinner);
            resetGame();
        }
    };

    const playerWin = function (player1, player2) {
        let distanceBetweenPlayerPoints = player1.getPoints() - player2.getPoints();
        return player1.getPoints() > 3 && distanceBetweenPlayerPoints > 1;
    };

    const addGame = function (player) {
        player.addGame();
    };

    const pointForPlayer = function (playerNumber) {
        players[playerNumber].addPoint();
        checkMatchResult();
    };

    const scoreForPlayer = function (playerNumber) {
        return players[playerNumber].show();
    };

    const winner = function () {
        let result = -1;

        if (players[PLAYER_1].getGames() > players[PLAYER_2].getGames()) {
            result = PLAYER_1;
        }

        if (players[PLAYER_1].getGames() < players[PLAYER_2].getGames()) {
            result = PLAYER_2;
        }

        return result;
    };

    return {pointForPlayer, scoreForPlayer, winner};
};


// TESTS
test('-------- Component: testing player score', (assert) => {
    const message = 'Incorrect points for player one.';
    const expectedScore = 40;

    const tennis = Tennis();
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);

    const actualScore = tennis.scoreForPlayer(0);

    assert.equal(actualScore, expectedScore, message);

    assert.end();
});

test('-------- Component: testing player score in a deuce score', (assert) => {
    const message = 'Incorrect score for player one';
    const expectedScore = 40;

    const tennis = Tennis();
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(1);

    const actualScore = tennis.scoreForPlayer(0);

    assert.equal(actualScore, expectedScore, message);

    assert.end();
});

test('-------- Component: testing player score when this player has advantage', (assert) => {
    const message = 'Incorrect score for player one';
    const expectedScore = 'advantage';

    const tennis = Tennis();
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(0);

    const actualScore = tennis.scoreForPlayer(0);

    assert.equal(actualScore, expectedScore, message);

    assert.end();
});

test('-------- Component: testing which player won the match', (assert) => {
    const message = 'Player one is the winner';
    const expectedWinner = 0;

    const tennis = Tennis();
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);

    const actualWinner = tennis.winner();

    assert.equal(actualWinner, expectedWinner, message);

    assert.end();
});

test('-------- Component: testing who is the winner while players are in a deuce', (assert) => {
    const message = 'There is not winner yet';
    const expectedWinner = -1;

    const tennis = Tennis();
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);

    const actualWinner = tennis.winner();

    assert.equal(actualWinner, expectedWinner, message);

    assert.end();
});

test('-------- Component: testing winner after deuce', (assert) => {
    const message = 'Player 2 must be the winner';
    const expectedWinner = 1;

    const tennis = Tennis();
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(0);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);
    tennis.pointForPlayer(1);

    const actualWinner = tennis.winner();

    assert.equal(actualWinner, expectedWinner, message);

    assert.end();
});
