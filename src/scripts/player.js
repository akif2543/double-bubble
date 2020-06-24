const Projectile = require("./projectile");

class Player {
  constructor(ctx, game) {
    this.game = game;
    this.lives = 5;
    this.score = 0;
    this.width = 50;
    this.height = this.game.DIMY / 6;
    this.pX = this.game.DIMX / 2 - this.width * 0.7;
    this.pY = this.game.FLOOR - this.height + 5;
    this.img = new Image();
    this.img.onload = () =>
      ctx.drawImage(this.img, this.pX, this.pY, this.width, this.height);
    this.img.src = "bluegray_back.png";
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.pX, this.pY, this.width, this.height);
  }

  move(dir) {
    this.img.src = dir ? "blue_side.png" : "bluegray_back.png";
    const newX = this.pX + dir;
    if (newX + this.width >= this.game.RWALL) {
      this.pX = this.game.RWALL - this.width;
    } else if (newX <= this.game.LWALL) {
      this.pX = this.game.LWALL;
    } else {
      this.pX = newX;
    }
  }

  reset() {
    this.pX = this.game.DIMX / 2 - this.width * 0.7;
  }

  fire() {
    this.img.src = "bluegray_back.png";
    this.game.setProjectile(
      new Projectile([this.pX + 22.5, this.pY], this.game)
    );
  }

  decrementLife() {
    this.lives--;
  }
}

module.exports = Player;
