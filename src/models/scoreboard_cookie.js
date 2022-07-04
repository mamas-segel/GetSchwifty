import Score from "./score.js";

export default class ScoreboardCookie {
    /**
     * @param {string} name 
     * @param {number} maxAgeSeconds
     */
    constructor(name, maxAgeSeconds) {
        this.name = name;
        this.maxAgeSeconds = maxAgeSeconds;
    }

    get value() {
        const cookieValue = `; ${document.cookie}`;
        const parts = cookieValue.split(`; ${this.name}=`);
        return (parts.length === 2) ? parts.pop().split(';').shift() : null;
    }

    /**
     * @param {Score[]} scores 
     */
    update(scores) {
        document.cookie = `${this.name}=${JSON.stringify(scores)};max-age=${this.maxAgeSeconds}`;
    }

    /**
     * @param {number} maxScores 
     */
    load(maxScores) {
        if (!this.value) {
            return null;
        }

        return JSON.parse(this.value)
            .map(s => new Score(s.playerName, s.boardSize, new Date(s.startDate), s.gameLength))
            .slice(0, maxScores);
    }
}
