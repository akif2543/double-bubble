class Projectile {
  constructor(pos, game) {
    this.game = game;
    [this.pX, this.pY] = pos;
    this.width = 5;
    this.height = this.game.DIMY - this.pY;
    this.color = "yellow";
    this.SPEED = 0.75;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pX, this.pY, this.width, this.height);
  }

  move(delta) {
    this.pY -= delta * this.SPEED;
    this.height += delta * this.SPEED;
    if (this.pY <= 0) this.game.remove(this);
  }
}

module.exports = Projectile;
