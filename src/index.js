import BoardView from "./views/board_view.js";
import ScoreboardView from "./views/scoreboard_view.js";
import GameView from "./views/game_view.js";
import GameController from "./controllers/game_controller.js";
import Scoreboard from "./models/scoreboard.js";
import ScoreboardCookie from "./models/scoreboard_cookie.js";

const cookie = new ScoreboardCookie("scoreboard", 30 * 60);
const scoreboard = new Scoreboard(5, cookie);

const gameView = new GameView(new BoardView(), new ScoreboardView());
const app = new GameController(gameView, scoreboard);

app.startGame();
