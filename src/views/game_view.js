export default class GameView {
    constructor(board, scoreboard, userInteraction) {
        this.board = board;
        this.scoreboard = scoreboard;
        this.userInteraction = userInteraction;
    }

    warnInvalidMove(tileValue) {
        this.userInteraction.showMessage(`Invalid Move '${tileValue}'!`);
    }

    onBoardSolved() {
        this.userInteraction.showMessage("You solved the board, good job!");
        this.board.disableTilesClick();
    }

    listenTileClicked(listener) {
        for (const tile of this.board.tileNodes) {
            tile.onclick = () => {
                listener(Number(tile.getAttribute("value")));
            }
        }
    }

    listenPlayAgainClicked(listener) {
        const btn = document.getElementById("play-again-btn");
        btn.onclick = listener;
    }

    getBoardSize() {
        let boardSize;

        while (!boardSize) {
            let boardSizeInput = this.userInteraction.getInput("Enter board size (2+)");

            if (isNaN(boardSizeInput) || Number(boardSizeInput) < 2) {
                this.userInteraction.showMessage(`Invalid size '${boardSizeInput}'. Please enter a valid size! (2+)`);
            } else {
                boardSize = Number(boardSizeInput);
            }
        }

        this.board.setTilesSize(boardSize);
        return boardSize;
    }

    getPlayerName() {
        let playerName;

        do {
            playerName = this.userInteraction.getInput("Enter your player name");
        } while (!playerName);

        return playerName;
    }
}
