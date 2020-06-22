const Game = require("./game");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game();
    this.last = 0;
    this.animate = this.animate.bind(this);
  }

  bindKeys() {
    key("space", () => {
      this.game.player.fire();
      return false;
    });

    key("a", () => {
      this.game.player.move(-10);
      return false;
    });

    key("d", () => {
      this.game.player.move(10);
      return false;
    });
  }

  animate(now) {
    const delta = now - this.last;
    this.game.step(delta);
    this.game.draw(this.ctx);
    this.last = now;
    requestAnimationFrame(this.animate);
  }

  start() {
    this.bindKeys();
    requestAnimationFrame(this.animate);
  }
}

module.exports = GameView;
