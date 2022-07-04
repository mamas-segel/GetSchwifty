import Board from "./board.js";

export default class BoardBuilder {
    /**
     * @param {number} size
     */
    constructor(size) {
        this.size = size;
    }

    /**
     * @param {number[]} board
     */
    shuffle(board) {
        for (let i = board.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }
    }

    build() {
        const board = [];
        const flatBoard = Array.from({ length: this.size ** 2 }, (_, i) => i + 1);

        this.shuffle(flatBoard);

        for (let i = 0; i < flatBoard.length; i += this.size) {
            board.push(flatBoard.slice(i, i + this.size));
        }

        return new Board(board);
    }
}
