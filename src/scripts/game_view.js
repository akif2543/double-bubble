const Game = require("./game");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(ctx);
    this.last = 0;
    this.bg = new Image();
    this.bg.onload = () => ctx.drawImage(this.bg, 0, 0, 1000, 600);
    this.bg.src = "db_bg.jpg";
    this.start = this.start.bind(this);
    this.animate = this.animate.bind(this);
    this.checkRestart = this.checkRestart.bind(this);
    this.first = true;
  }

  bindKeys() {
    const keys = {};
    const handler = (e) => {
      e.preventDefault();
      keys[e.key] = e.type === "keydown";

      // if (keys[" "]) this.game.player.fire();
      // if (keys.a || keys.A) this.game.player.move(-20);
      // else this.game.player.move(0);
      // if (keys.d || keys.D) this.game.player.move(20);
      // else this.game.player.move(0);

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
        // case keys["Enter"]:
        //   this.game.togglePause();
        //   this.last = 0;
        //   if (!this.game.pause) this.start();
        //   break;
        default:
          this.game.player.move(0);
      }
    };

    document.addEventListener("keydown", handler);
    document.addEventListener("keyup", handler);
  }

  welcome() {
    // this.game.draw(this.ctx);
    this.ctx.drawImage(this.bg, 0, 0);
    const canvas = document.getElementById("game");
    canvas.addEventListener("mouseup", this.start);
  }

  animate(now) {
    const delta = now - this.last;
    this.game.step(delta);
    this.game.draw(this.ctx);
    this.last = now;
    if (this.game.pause || this.game.over) return;
    requestAnimationFrame(this.animate);
  }

  start() {
    this.game = this.game.player.lives ? this.game : new Game(this.ctx);
    this.bindKeys();
    this.game.resetLevel();
    requestAnimationFrame(this.animate);
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
