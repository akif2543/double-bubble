const Bubble = require("./bubble");
const Player = require("./player");

// const diff = {
//   1: [10],
//   2: [20],
//   3: [40],
//   4: [40, 40],
// };

class Game {
  constructor() {
    this.DIMX = 1000;
    this.DIMY = 600;
    this.level = 1;
    this.bubbles = [];
    this.addBubble({ pos: [50, 300], vel: [10, 10], radius: 40, color: "red" });
    this.player = new Player(this);
    this.projectile = [];
    // this.startingPos = [Math.floor(this.DIMX / 5), Math.floor(this.DIMY / 4)];
  }

  remove(o) {
    if (o instanceof Bubble) {
      this.bubbles.splice(this.bubbles.indexOf(o), 1);
      if (o.canDivide) o.divide();
    } else {
      this.projectile = [];
    }
  }

  addBubble(opts) {
    this.bubbles.push(new Bubble(opts, this));
  }

  setProjectile(p) {
    if (Array.isArray(this.projectile)) this.projectile = p;
  }

  allObjs() {
    return this.bubbles.concat(this.player, this.projectile);
  }

  movingObjs() {
    return this.bubbles.concat(this.projectile);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.DIMX, this.DIMY);
    // ctx.drawImage(img, 0, 0);
    this.allObjs().forEach((b) => b.draw(ctx));
  }

  move(delta) {
    this.movingObjs().forEach((o) => o.move(delta));
  }

  checkCollisions() {
    this.bubbles.forEach((b) => {
      if (b.isCollidedWith(this.player)) {
        alert("you lost a life!");
      } else if (b.isCollidedWith(this.projectile)) {
        this.remove(b);
      }
    });
  }

  step(delta) {
    this.move(delta);
    this.checkCollisions();
  }
}

module.exports = Game;
