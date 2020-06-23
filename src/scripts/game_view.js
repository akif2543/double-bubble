const Game = require("./game");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    // this.playerImg = new Image();
    // this.playerImg.onload = () => {
    //   this.ctx.drawImage(this.img, 0, 0);
    // };
    // this.playerImg.src = "player_back.png";
    this.game = new Game(ctx);
    this.last = 0;
    this.animate = this.animate.bind(this);
  }

  bindKeys() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.key) {
        case " ":
          return this.game.player.fire();
        case "a":
          return this.game.player.move(-20);
        case "A":
          return this.game.player.move(-20);
        case "d":
          return this.game.player.move(20);
        case "D":
          return this.game.player.move(20);
        default:
          return;
      }
    });

    // key("space", () => {
    //   this.game.player.fire();
    //   return false;
    // });

    // key("a", () => {
    //   this.game.player.move(-10);
    //   return false;
    // });

    // key("d", () => {
    //   this.game.player.move(10);
    //   return false;
    // });
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
