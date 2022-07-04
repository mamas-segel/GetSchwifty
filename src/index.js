import BoardView from "./views/board_view.js";
import ScoreboardView from "./views/scoreboard_view.js";
import GameView from "./views/game_view.js";
import GameController from "./controllers/game_controller.js";
import Scoreboard from "./models/scoreboard.js";

const scoreboard = new Scoreboard(5);
const gameView = new GameView(new BoardView(), new ScoreboardView());
const app = new GameController(gameView, scoreboard);

app.startGame();
