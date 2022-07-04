import Game from "../models/game.js";
import BoardBuilder from "../models/board_builder.js";

export default class GameController {
    constructor(view) {
        this.view = view;
    }

    run() {
        let game;
        const boardSize = this.view.getBoardSize();
        const boardBuilder = new BoardBuilder(boardSize);

        do {
            game = new Game(boardBuilder.build());
        } while (!game.isBoardValid());

        this.view.displayTiles(game.board.values);
        this.view.listenTileClicked(this.onTileClicked(game));
    }

    /**
     * @param {Game} game 
     */
    onTileClicked(game) {
        return (tileValue) => {
            if (game.tryMoveValue(tileValue)) {
                this.view.moveTiles(tileValue);
                if (game.isBoardSolved()) {
                    this.view.onBoardSolved();
                }
            } else {
                this.view.warnInvalidMove(tileValue);
            }
        }
    }
}
