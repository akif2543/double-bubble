class Projectile {
  constructor(pos, game) {
    this.game = game;
    [this.pX, this.pY] = pos;
    this.width = 7;
    this.height = this.game.FLOOR - this.pY;
    this.SPEED = 0.75;
    this.img = new Image();
    this.img.src = "laser.png";
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.pX, this.pY, this.width, this.height);
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pX, this.pY, this.width, this.height);
  }

  move(delta) {
    this.pY -= delta * this.SPEED;
    this.height += delta * this.SPEED;
    if (this.pY <= 0) this.game.remove(this);
  }
}

module.exports = Projectile;
