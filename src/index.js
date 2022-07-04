import GameView from "./views/game_view.js";
import GameController from "./controllers/game_controller.js";

const app = new GameController(new GameView());

app.run();
