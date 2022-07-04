export default class Game {
    constructor(board) {
        this.board = board;
        this.startDate = new Date();
    }

    isBoardValid() {
        let totalOpposites = 0;
        const values = this.board.values;

        values.forEach((value, i) => {
            if (value !== this.board.lastValue) {
                totalOpposites += values.slice(i).filter((other) => value > other).length;
            }
        });

        if (this.board.rowCount % 2 === 0) {
            const [i, ] = this.board.lastValueIndex;
            totalOpposites += i + 1;
        }

        return totalOpposites % 2 === 0;
    }

    isBoardSolved() {
        const values = this.board.values;

        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] > values[i + 1]) {
                return false;
            }
        }

        return true;
    }

    tryMoveValue(value) {
        const [i, j] = this.board.lastValueIndex;
        const neighbors = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]];
        const neighborToMove = neighbors.find(([row, column]) => this.board.getValue(row, column) === value);

        if (!neighborToMove) {
            return false;
        }

        this.board.moveValues(i, j, ...neighborToMove);
        return true;
    }
}
