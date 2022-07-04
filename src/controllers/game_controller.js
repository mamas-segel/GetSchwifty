import {BoardBuilder, Game, Score} from "../models/index.js";

export default class GameController {
    constructor(view, scoreboard) {
        this.game = null;
        this.view = view;
        this.scoreboard = scoreboard;

        this.view.listenPlayAgainClicked(this.onPlayAgainClicked);
        this.scoreboard.listenScoresChanged(this.onScoresChanged);

        this.scoreboard.tryLoadFromCookie();
        this.view.scoreboard.displayScores(this.scoreboard.scores);
    }

    startGame() {
        const boardBuilder = new BoardBuilder(this.view.getBoardSize());

        do {
            this.game = new Game(boardBuilder.build());
        } while (!this.game.isBoardValid());

        this.view.board.displayTiles(this.game.board.values);
        this.view.listenTileClicked(this.onTileClicked);
    }

    onPlayAgainClicked = () => {
        this.startGame();
    }

    /**
     * @param {Score[]} scores 
     */
    onScoresChanged = (scores) => {
        this.view.scoreboard.displayScores(scores);
    }

    onTileClicked = (tileValue) => {
        if (!this.game.tryMoveValue(tileValue)) {
            this.view.warnInvalidMove(tileValue);
            return;
        }

        this.view.board.moveTiles(tileValue);

        if (this.game.isBoardSolved()) {
            this.view.onBoardSolved();

            const score = new Score(
                this.view.getPlayerName(),
                this.game.board.rowCount,
                this.game.startDate
            );
            this.scoreboard.tryAddScore(score);
        }
    }
}
