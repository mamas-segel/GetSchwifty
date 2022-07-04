export default class ScoreboardView {
    constructor() {
        this.table = document.getElementById("scoreboard");
    }

    displayScores(scores) {
        while (this.table.rows.length > 1) {
            this.table.deleteRow(1);
        }

        scores.forEach((score) => {
            const row = this.table.insertRow();
            const playerNameCell = row.insertCell();
            const boardSizeCell = row.insertCell();
            const gameLengthCell = row.insertCell();
            const startDateCell = row.insertCell();

            playerNameCell.textContent = score.playerName;
            boardSizeCell.textContent = score.boardSize;
            gameLengthCell.textContent = `${score.gameLength.toLocaleString()} Minutes`;
            startDateCell.textContent = score.startDate.toLocaleString();
        });
    }
}
