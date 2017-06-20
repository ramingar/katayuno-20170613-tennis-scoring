import test from 'tape';

const Score = function () {
    return {show};
};

// Component to test
const Tennis = function () {
    const scoreConversion = {0: 0, 1: 15, 2: 30, 3: 40};
    const pointsPerPlayer = [0, 0];
    const gameScores = [0, 0];
    const PLAYER_1 = 0;
    const PLAYER_2 = 1;

    const resetGame = function () {
        pointsPerPlayer[PLAYER_1] = 0;
        pointsPerPlayer[PLAYER_2] = 0;
    };

    const checkMatchResult = function () {
        // TODO: refactor with a map
        if (playerWin(PLAYER_1, PLAYER_2)) {
            updateGameScore(PLAYER_1);
            resetGame();
        }

        if (playerWin(PLAYER_2, PLAYER_1)) {
            updateGameScore(PLAYER_2);
            resetGame();
        }
    };

    const playerWin = function (player1, player2) {
        let distanceBetweenPlayerPoints = pointsPerPlayer[player1] - pointsPerPlayer[player2];
        return pointsPerPlayer[player1] > 3 && distanceBetweenPlayerPoints > 1;
    };

    const updateGameScore = function (player) {
        gameScores[player] = gameScores[player] + 1;
    };

    const ballWonForPlayer = function (playerNumber) {
        pointsPerPlayer[playerNumber] = pointsPerPlayer[playerNumber] + 1;
        checkMatchResult();
    };

    const scoreForPlayer = function (playerNumber) {
        return scoreConversion[pointsPerPlayer[playerNumber]];
    };

    const winner = function () {
        let result = -1;

        if (gameScores[PLAYER_1] > gameScores[PLAYER_2]) {
            result = 0;
        }

        if (gameScores[PLAYER_1] < gameScores[PLAYER_2]) {
            result = 1;
        }

        return result;
    };

    return {ballWonForPlayer, scoreForPlayer, winner};
};


// TESTS
test('-------- Component: testing player score', (assert) => {
    const message = 'Incorrect points for player one.';
    const expected = 40;

    const tennis = Tennis();
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);

    const actual = tennis.scoreForPlayer(0);

    assert.equal(actual, expected, message);

    assert.end();
});

test('-------- Component: testing which player won the match', (assert) => {
    const message = 'Player one is the winner';
    const expected = 0;

    const tennis = Tennis();
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);

    const actual = tennis.winner();

    assert.equal(actual, expected, message);

    assert.end();
});

test('-------- Component: testing deuce', (assert) => {
    const message = 'There is not winner yet';
    const expected = -1;

    const tennis = Tennis();
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(1);
    tennis.ballWonForPlayer(1);
    tennis.ballWonForPlayer(1);
    tennis.ballWonForPlayer(1);

    const actual = tennis.winner();

    assert.equal(actual, expected, message);

    assert.end();
});

test('-------- Component: testing winner after deuce', (assert) => {
    const message = 'Player 2 must be the winner';
    const expected = 1;

    const tennis = Tennis();
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(0);
    tennis.ballWonForPlayer(1);
    tennis.ballWonForPlayer(1);
    tennis.ballWonForPlayer(1);
    tennis.ballWonForPlayer(1);
    tennis.ballWonForPlayer(1);

    const actual = tennis.winner();

    assert.equal(actual, expected, message);

    assert.end();
});

/* In progress...
 test('-------- Component: testing points after deuce', (assert) => {
 const message = 'Player 2 must have advantage';
 const expected = 1;

 const tennis = Tennis();
 tennis.ballWonForPlayer(0);
 tennis.ballWonForPlayer(0);
 tennis.ballWonForPlayer(0);
 tennis.ballWonForPlayer(1);
 tennis.ballWonForPlayer(1);
 tennis.ballWonForPlayer(1);
 tennis.ballWonForPlayer(1);

 const actual = tennis.scoreForPlayer(1);

 assert.equal(actual, expected, message);

 assert.end();
 });
 */
