export default class GameView {
    constructor(board, scoreboard) {
        this.board = board;
        this.scoreboard = scoreboard;
    }

    warnInvalidMove(tileValue) {
        alert(`Invalid Move '${tileValue}'!`);
    }

    onBoardSolved() {
        alert("You solved the board, good job!");
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
            let boardSizeInput = window.prompt("Enter board size (2+)");

            if (isNaN(boardSizeInput) || Number(boardSizeInput) < 2) {
                alert(`Invalid size '${boardSizeInput}'. Please enter a valid size! (2+)`);
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
            playerName = window.prompt("Enter your player name");
        } while (!playerName);

        return playerName;
    }
}
