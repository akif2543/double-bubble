class Bubble {
  constructor(opts, game) {
    this.game = game;
    this.radius = opts.radius;
    this.color = opts.color;
    this.pos = opts.pos; // || default pos;
    this.vel = opts.vel; // || default vel;
    this.GRAVITY = 0.5;
    this.BOUNCE = -0.9;
    this.canDivide = this.radius !== 5;
  }

  draw(ctx) {
    const [x, y] = this.pos;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  move(delta = 1) {
    const [pX, pY] = this.pos;
    const [vX, vY] = this.vel;
    this.pos = [pX + (vX * delta) / 20, pY + (vY * delta) / 20];
    this.applyPhysics();
  }

  applyPhysics() {
    const [pX, pY] = this.pos;
    this.vel[1] += this.GRAVITY;

    if (pX + this.radius >= this.game.DIMX || pX - this.radius <= 0) {
      this.vel[0] *= Math.abs(this.vel[0]) > 7 ? this.BOUNCE : -1.1;
    }
    if (pY + this.radius >= this.game.DIMY) {
      this.pos[1] = this.game.DIMY - this.radius;
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
      radius: this.radius / 2,
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
    const pX = Math.max(Math.min(this.pos[0], obj.width + obj.pX), obj.pX);
    const pY = Math.max(Math.min(this.pos[1], obj.height + obj.pY), obj.pY);
    const distance = Math.sqrt(
      (this.pos[0] - pX) ** 2 + (this.pos[1] - pY) ** 2
    );
    return distance < this.radius * 0.3;
  }
}

module.exports = Bubble;
