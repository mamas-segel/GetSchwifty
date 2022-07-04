export default class Score {
    /**
     * @param {string} playerName 
     * @param {number} boardSize 
     * @param {Date} startDate 
     * @param {number} gameLength
     */
    constructor(playerName, boardSize, startDate, gameLength = null) {
        this.playerName = playerName;
        this.boardSize = boardSize;
        this.startDate = startDate;

        if (gameLength) {
            this.gameLength = gameLength;
        } else {
            const diffMinutes = (new Date() - startDate) / (1000 * 60);
            this.gameLength = parseFloat(diffMinutes.toFixed(3));
        }
    }

    /**
     * @param {Score} other 
     */
    isBetterThan(other) {
        return this.boardSize > other.boardSize || this.gameLength < other.gameLength;
    }
}
