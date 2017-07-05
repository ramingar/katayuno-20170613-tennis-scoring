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

export default Score;
