const GameView = require("./scripts/game_view");

console.log("webpackin heat");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  window.ctx = ctx;

  const view = new GameView(ctx);
  view.start();
});
