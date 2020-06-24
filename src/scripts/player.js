const Projectile = require("./projectile");

class Player {
  constructor(game) {
    this.game = game;
    this.lives = 5;
    this.score = 0;
    this.width = 50;
    this.height = this.game.DIMY / 6;
    this.pX = this.game.DIMX / 2 - this.width / 2;
    this.pY = this.game.FLOOR - this.height + 5;
    this.img = new Image();
    this.img.src = "blue_back.png";
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.drawImage(this.img, this.pX, this.pY, this.width, this.height);
    ctx.strokeRect(this.pX, this.pY, this.width, this.height);
    ctx.clip();

    // ctx.strokeRect(this.pX, this.pY, 50, this.height);
    // ctx.clip();
    ctx.restore();
  }

  move(dir) {
    this.img.src = dir ? "blue_side.png" : "blue_back.png";
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
    this.pX = this.game.DIMX / 2;
  }

  fire() {
    this.img.src = "blue_back.png";
    this.game.setProjectile(
      new Projectile([this.pX + 50 / 2, this.pY], this.game)
    );
  }

  decrementLife() {
    this.lives--;
  }
}

module.exports = Player;
