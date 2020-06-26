import "./styles/index.scss";

const GameView = require("./scripts/game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const view = new GameView(ctx);
  view.welcome();
});
