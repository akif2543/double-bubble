class Bubble {
  constructor(opts, ctx, game) {
    this.game = game;
    this.radius = opts.radius;
    this.color = opts.color;
    this.pos = opts.pos;
    this.vel = opts.vel;
    this.GRAVITY = 0.5;
    this.BOUNCE = -0.9;
    this.canDivide = this.radius !== 10;
    this.img = new Image();
    this.img.onload = () => this.draw(ctx);
    this.img.src = "assets/yellow_disc.png";
  }

  draw(ctx) {
    const [x, y] = this.pos;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      this.img,
      x - this.radius,
      y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
  }

  move(delta = 1) {
    const [pX, pY] = this.pos;
    const [vX, vY] = this.vel;
    this.pos = [pX + vX / 2, pY + vY / 2];
    this.applyPhysics();
  }

  applyPhysics() {
    const [pX, pY] = this.pos;
    this.vel[1] += this.GRAVITY;

    if (
      pX + this.radius >= this.game.RWALL ||
      pX - this.radius <= this.game.LWALL
    ) {
      this.vel[0] *= Math.abs(this.vel[0]) > 7 ? this.BOUNCE : -1.1;
    }
    if (pY + this.radius * 0.7 >= this.game.FLOOR) {
      this.pos[1] = this.game.FLOOR - this.radius;
      this.vel[1] *= this.vel[1] > 14 ? this.BOUNCE : -1;
    }
  }

  divide() {
    const [pX, pY] = this.pos;
    const [vX, vY] = this.vel;
    const displacement = this.radius;
    const opts = {
      pos: [pX + displacement, pY - displacement],
      vel: [vX * -this.BOUNCE, vY / -this.BOUNCE],
      radius: this.radius - 10,
      color: this.color,
    };
    return [
      opts,
      {
        ...opts,
        pos: [pX - displacement, opts.pos[1]],
        vel: [opts.vel[0] * -1, opts.vel[1]],
      },
    ].forEach((o) => this.game.addBubble(o));
  }

  isCollidedWith(obj) {
    if (Array.isArray(obj)) return false;

    const dX = Math.abs(this.pos[0] - obj.pX - obj.width / 2) * 1.2;
    const dY = Math.abs(this.pos[1] - obj.pY - obj.height / 2);

    if (dX > obj.width / 2 + this.radius || dY > obj.height / 2 + this.radius)
      return false;
    if (dX <= obj.width / 2 || dY <= obj.height / 2) return true;

    const pX = dX - obj.width / 2;
    const pY = dY - obj.height / 2;

    const dist = pX ** 2 + pY ** 2;
    return dist <= this.radius ** 2;
  }
}

module.exports = Bubble;
