const Projectile = require("./projectile");

class Player {
  constructor(game) {
    this.game = game;
    this.lives = 5;
    this.score = 0;
    this.color = "white";
    this.width = 50;
    this.height = this.game.DIMY / 6;
    this.pX = this.game.DIMX / 2;
    this.pY = this.game.DIMY - this.height;
    this.img = new Image();
    // this.img.onload = () => {
    //   ctx.drawImage(this.img, this.pX, this.pY, this.width, this.height);
    // };
    this.img.src = "player_back.png";
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pX, this.pY, this.width, this.height);
    ctx.drawImage(this.img, this.pX, this.pY, this.width, this.height);
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
