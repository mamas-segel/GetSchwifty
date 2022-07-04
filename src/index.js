import GameView from "./views/game_view.js";
import GameController from "./controllers/game_controller.js";
import Scoreboard from "./models/scoreboard.js";

const app = new GameController(new GameView(), new Scoreboard(5));

app.startGame();
