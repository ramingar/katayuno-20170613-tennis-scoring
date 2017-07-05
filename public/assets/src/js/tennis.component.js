import Score from './score.component';

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

export default Tennis;
