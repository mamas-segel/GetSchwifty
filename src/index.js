import { GameController } from "./controllers/index.js";
import { Scoreboard, ScoreboardCookie } from "./models/index.js";
import { UserInteractionView, BoardView, ScoreboardView, GameView} from "./views/index.js";

const cookie = new ScoreboardCookie("scoreboard", 30 * 60);
const scoreboard = new Scoreboard(5, cookie);

const userInteractionView = new UserInteractionView();
const boardView = new BoardView();
const scoreboardView = new ScoreboardView();

const gameView = new GameView(boardView, scoreboardView, userInteractionView);
const app = new GameController(gameView, scoreboard);

app.startGame();
