const Game = require("./game");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(ctx);
    this.last = 0;
    this.bindKeys();
    this.start = this.start.bind(this);
    this.animate = this.animate.bind(this);
    this.checkRestart = this.checkRestart.bind(this);
    this.int = null;
  }

  bindKeys() {
    const keys = {};
    const handler = (e) => {
      e.preventDefault();
      keys[e.key] = e.type === "keydown";

      switch (true) {
        case keys[" "]:
          this.game.player.fire();
          break;
        case keys["a"]:
          this.game.player.move(-20);
          break;
        case keys["A"]:
          this.game.player.move(-20);
          break;
        case keys["d"]:
          this.game.player.move(20);
          break;
        case keys["D"]:
          this.game.player.move(20);
          break;
        default:
          this.game.player.move(0);
      }
    };

    document.addEventListener("keydown", handler);
    document.addEventListener("keyup", handler);
  }

  animate(now) {
    const delta = now - this.last;
    this.game.step(delta);
    this.game.draw(this.ctx);
    this.last = now;
    if (this.game.pause) {
      this.stop();
      setTimeout(this.game.togglePause, 5000);
    }
    this.requestId = requestAnimationFrame(this.animate);
  }

  start() {
    this.requestId = requestAnimationFrame(this.animate);
  }

  stop() {
    cancelAnimationFrame(this.requestId);
  }

  checkRestart() {
    if (!this.game.pause) {
      clearInterval(this.int);
      this.int = null;
      this.last = 0;
      this.start();
    }
  }
}

module.exports = GameView;
