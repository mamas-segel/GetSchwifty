export default class GameView {
    constructor() {
        this.board = document.getElementById("board");
        this.scoresTable = document.getElementById("scoreboard");
        this.lastTileValue = 0;
    }

    warnInvalidMove(tileValue) {
        alert(`Invalid Move '${tileValue}'!`);
    }

    onBoardSolved() {
        alert("You solved the board, good job!");

        for (const tile of this.board.children) {
            tile.onclick = null;
        }
    }

    listenTileClicked(listener) {
        for (const tile of this.board.children) {
            tile.onclick = () => {
                listener(Number(tile.getAttribute("value")));
            }
        }
    }

    listenPlayAgainClicked(listener) {
        const btn = document.getElementById("play-again-btn");
        btn.onclick = listener;
    }

    /**
     * @param {number[]} tiles
     */
    displayTiles(tiles) {
        while (this.board.firstChild) {
            this.board.removeChild(this.board.firstChild);
        }

        this.lastTileValue = Math.max(...tiles);

        tiles.forEach((value) => {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.setAttribute("value", value);

            if (value !== this.lastTileValue) {
                tile.textContent = value;
                tile.style.backgroundColor = "white";
            } else {
                tile.style.backgroundColor = "grey";
            }

            this.board.append(tile);
        });
    }

    displayScores(scores) {
        while (this.scoresTable.rows.length > 1) {
            this.scoresTable.deleteRow(1);
        }

        scores.forEach((score) => {
            const row = this.scoresTable.insertRow();
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

    /**
     * @param {number} value
     */
    moveTiles(tileValue) {
        let tileToMove, lastTile;

        for (const tile of this.board.children) {
            const value = Number(tile.getAttribute("value"));

            if (value === this.lastTileValue) {
                lastTile = tile;
            } else if (value === tileValue) {
                tileToMove = tile;
            }
        }

        const temp = tileToMove.getAttribute("value");
        tileToMove.setAttribute("value", lastTile.getAttribute("value"));
        lastTile.setAttribute("value", temp);

        tileToMove.style.backgroundColor = lastTile.style.backgroundColor;
        lastTile.style.backgroundColor = "white";

        [tileToMove.textContent, lastTile.textContent] = [lastTile.textContent, tileToMove.textContent];
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

        this.board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
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
