import "./styles/index.scss";

const GameView = require("./scripts/game_view");

console.log("webpackin heat");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const view = new GameView(ctx);
  view.welcome();
});
