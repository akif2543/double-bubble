const Projectile = require("./projectile");

class Player {
  constructor(game) {
    this.game = game;
    this.lives = 5;
    this.score = 0;
    this.color = "white";
    this.width = 30;
    this.height = this.game.DIMY / 8;
    this.pY = this.game.DIMY - this.height;
    this.pX = this.game.DIMX / 2;
    this.center = [this.pX + this.width / 2, this.pY + this.height / 2];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pX, this.pY, this.width, this.height);
  }

  move(dir) {
    const newX = this.pX + dir;
    if (newX + this.width >= this.game.DIMX) {
      this.pX = this.game.DIMX - this.width;
    } else if (newX <= 0) {
      this.pX = 0;
    } else {
      this.pX = newX;
    }
  }

  fire() {
    this.game.setProjectile(
      new Projectile([this.pX + this.width / 2, this.pY], this.game)
    );
  }

  decrementLife() {
    this.lives--;
  }
}

module.exports = Player;
