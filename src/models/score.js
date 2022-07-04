export default class Score {
    /**
     * @param {string} playerName 
     * @param {number} boardSize 
     * @param {Date} startDate 
     */
    constructor(playerName, boardSize, startDate) {
        this.playerName = playerName;
        this.boardSize = boardSize;
        this.startDate = startDate;

        const diffMinutes = (new Date() - startDate) / (1000 * 60);
        this.gameLength = parseFloat(diffMinutes.toFixed(3));
    }

    /**
     * @param {Score} other 
     */
    isBetterThan(other) {
        return this.boardSize > other.boardSize || this.gameLength < other.gameLength;
    }
}
