const Game = require("./game");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(ctx);
    this.last = 0;
    this.bg = new Image();
    this.bg.onload = () => {
      ctx.drawImage(this.bg, 0, 0, 1000, 600);
      ctx.font = "48px Orbitron";
      ctx.fillStyle = "white";
      ctx.fillText("Click to start", 400, 300, 200);
    };
    this.bg.src = "assets/db_bg.jpg";
    this.start = this.start.bind(this);
    this.animate = this.animate.bind(this);
    this.checkRestart = this.checkRestart.bind(this);
    this.canvas = document.getElementById("game");
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
        case keys.a || keys.A:
          this.game.player.move(-15);
          break;
        case keys.d || keys.D:
          this.game.player.move(15);
          break;
        default:
          this.game.player.move(0);
      }
    };

    document.addEventListener("keydown", handler);
    document.addEventListener("keyup", handler);
  }

  welcome() {
    this.canvas.addEventListener("mouseup", this.start);
  }

  animate(now) {
    const delta = now - this.last;
    this.game.step(delta);
    this.game.draw(this.ctx);
    this.last = now;
    if (this.game.over) return this.end();
    requestAnimationFrame(this.animate);
  }

  start() {
    this.game = this.game.player.lives ? this.game : new Game(this.ctx);
    this.bindKeys();
    this.canvas.removeEventListener("mouseup", this.start);
    this.game.resetLevel();
    requestAnimationFrame(this.animate);
  }

  end() {
    this.ctx.font = "48px Orbitron";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Click to play again", 300, 300, 400);
    document.removeEventListener("keydown");
    document.removeEventListener("keyup");
    return this.welcome();
  }

  checkRestart() {
    if (!this.game.pause) {
      this.last = 0;
      this.start();
    }
  }
}

module.exports = GameView;
