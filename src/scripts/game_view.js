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
    this.bg.src = "dist/assets/db_bg.jpg";
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
    this.animate = this.animate.bind(this);
    this.setRestart = this.setRestart.bind(this);
    this.canvas = document.getElementById("game");
    this.keys = {};
    this.handler = this.handler.bind(this);
  }

  handler(e) {
    e.preventDefault();
    this.keys[e.key] = e.type === "keydown";

    switch (true) {
      case this.keys[" "]:
        this.game.player.fire();
        break;
      case this.keys.a || this.keys.A:
        this.game.player.move(-15);
        break;
      case this.keys.d || this.keys.D:
        this.game.player.move(15);
        break;
      default:
        this.game.player.move(0);
    }
  }

  bindKeys(bind) {
    this.keys = {};
    if (bind) {
      document.addEventListener("keydown", this.handler);
      document.addEventListener("keyup", this.handler);
    } else {
      document.removeEventListener("keydown", this.handler);
      document.removeEventListener("keyup", this.handler);
    }
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
    if (this.game.pause) return this.setRestart();
    requestAnimationFrame(this.animate);
  }

  start() {
    this.game = this.game.player.lives ? this.game : new Game(this.ctx);
    this.bindKeys(true);
    this.canvas.removeEventListener("mouseup", this.start);
    this.game.resetLevel();
    requestAnimationFrame(this.animate);
  }

  restart() {
    this.bindKeys(true);
    requestAnimationFrame(this.animate);
  }

  end() {
    this.bindKeys(false);
    this.ctx.font = "48px Orbitron";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Click to play again", 300, 300, 400);
    return this.welcome();
  }

  setRestart() {
    this.bindKeys(false);
    this.last = 0;
    this.game.togglePause();
    setTimeout(this.restart, 1000);
  }
}

module.exports = GameView;
