import test from 'tape';
import Tennis from '../public/assets/src/js/tennis.component';

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
