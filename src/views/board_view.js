export default class BoardView {
    constructor() {
        this.div = document.getElementById("board");
        this.lastTileValue = 0;
    }

    get tileNodes() {
        return this.div.children;
    }

    disableTilesClick() {
        for (const tile of this.tileNodes) {
            tile.onclick = null;
        }
    }

    /**
     * @param {number} size 
     */
    setTilesSize(size) {
        this.div.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    }

    /**
     * @param {number[]} tiles
     */
    displayTiles(tiles) {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
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

            this.div.append(tile);
        });
    }

    /**
     * @param {number} tileValue
     */
    moveTiles(tileValue) {
        let tileToMove, lastTile;

        for (const tile of this.tileNodes) {
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
}
