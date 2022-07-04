export default class Scoreboard {
    /**
     * @param {number} maxScores
     */
    constructor(maxScores, cookie) {
        this.scores = [];
        this.maxScores = maxScores;
        this.cookie = cookie;
    }

    listenScoresChanged(listener) {
        this.onScoresChanged = listener;
    }

    tryLoadFromCookie() {
        const cookieScores = this.cookie.load(this.maxScores);

        if (cookieScores) {
            this.scores = cookieScores;
        }
    }

    tryAddScore(score) {
        const lastScore = this.scores[this.scores.length - 1];

        if (this.scores.length === this.maxScores && !score.isBetterThan(lastScore)) {
            return false;
        }

        this.scores.push(score);
        this.sortScores();

        if (this.scores.length > this.maxScores) {
            this.scores.pop();
        }

        this.cookie.update(this.scores);
        if (this.onScoresChanged) {
            this.onScoresChanged(this.scores);
        }
        return true;
    }

    sortScores() {
        this.scores.sort((score1, score2) => {
            if (score1.boardSize > score2.boardSize) {
                return -1;
            }

            if (score1.boardSize < score2.boardSize) {
                return 1;
            }

            if (score1.gameLength < score2.gameLength) {
                return -1;
            }

            if (score1.gameLength > score2.gameLength) {
                return 1;
            }

            return 0;
        });
    }
}
