export default class Board {
    /**
     * @param {number[][]} board
     */
    constructor(board) {
        this.board = board;
    }

    get rowCount() {
        return this.board.length;
    }

    get values() {
        return this.board.flat();
    }

    get lastValue() {
        return this.rowCount ** 2;
    }

    get lastValueIndex() {
        const row = this.board.findIndex(row => row.includes(this.lastValue));
        const column = this.board[row].indexOf(this.lastValue);
        return [row, column];
    }

    moveValues(row1, col1, row2, col2) {
        [this.board[row1][col1], this.board[row2][col2]] = [this.board[row2][col2], this.board[row1][col1]];
    }

    getValue(row, column) {
        if (row < 0 || column < 0 || row >= this.rowCount || column >= this.rowCount) {
            return null;
        }

        return this.board[row][column];
    }
}
