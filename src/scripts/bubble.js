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
    const [posX, posY] = this.pos;
    const [velX, velY] = this.vel;
    this.pos = [posX + (velX * delta) / 20, posY + (velY * delta) / 20];
    this.applyPhysics();
  }

  applyPhysics() {
    const [posX, posY] = this.pos;
    this.vel[1] += this.GRAVITY;

    if (posX + this.radius >= this.game.DIMX || posX - this.radius <= 0) {
      console.log(this.vel[0]);
      this.vel[0] *= Math.abs(this.vel[0]) > 7 ? this.BOUNCE : -1.1;
    }
    if (posY + this.radius >= this.game.DIMY) {
      console.log(this.vel[1]);
      this.pos[1] = this.game.DIMY - this.radius;
      this.vel[1] *= this.vel[1] > 14 ? this.BOUNCE : -1;
    }
  }

  divide() {
    const opts = {
      pos: this.pos,
      vel: this.vel,
      radius: this.radius / 2,
      color: this.color,
    };
    return [
      opts,
      { ...opts, vel: [this.vel[0] * -1, this.vel[1]] },
    ].forEach((o) => this.game.addBubble(o));
  }

  isCollidedWith(obj) {
    if (Array.isArray(obj)) return false;
    const pX = Math.max(Math.min(this.pos[0], obj.width + obj.pX), obj.pX);
    const pY = Math.max(Math.min(this.pos[1], obj.height + obj.pY), obj.pY);
    const distance = Math.sqrt(
      (this.pos[0] - pX) ** 2 + (this.pos[1] - pY) ** 2
    );
    return distance < this.radius;
  }
}

module.exports = Bubble;
