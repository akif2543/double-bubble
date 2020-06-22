const Game = require("./game");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game();
    this.last = 0;
    this.animate = this.animate.bind(this);
  }

  animate(now) {
    const delta = now - this.last;
    this.game.moveBubbles(delta);
    this.game.draw(this.ctx);
    this.last = now;
    requestAnimationFrame(this.animate);
  }

  start() {
    requestAnimationFrame(this.animate);
  }
}

module.exports = GameView;
