import test from 'tape';

const Score = function () {
    return {show};
};

// Component to test
const Tennis = function () {
    const scoreConversion = {0: 0, 1: 15, 2: 30, 3: 40};
    const players = [0, 0];
    const gameScores = [0, 0];
    const MAX_PLAYERS = 2;

    const resetGame = function () {
        players[0] = 0;
        players[1] = 0;
    };

    const checkMatchResult = function () {
        for (let player = 0; player < MAX_PLAYERS; player++) {
            if (players[player] === 4) {
                gameScores[player] = gameScores[player] + 1;
                resetGame();
            }
        }
    };

    const ballWonForPlayer = function (playerNumber) {
        players[playerNumber] = players[playerNumber] + 1;
        checkMatchResult();
    };

    const scoreForPlayer = function (playerNumber) {
        return scoreConversion[players[playerNumber]];
    };

    const winner = function () {
        let result = -1;

        if (gameScores[0] > gameScores[1]) {
            result = 0;
        }

        if (gameScores[0] < gameScores[1]) {
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
