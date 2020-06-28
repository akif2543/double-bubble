const Bubble = require("./bubble");
const Player = require("./player");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.setDimensions();
    this.level = 1;
    this.bubbles = [];
    this.player = new Player(ctx, this);
    this.over = !this.player.lives;
    this.pause = true;
    this.togglePause = this.togglePause.bind(this);
    this.bg = new Image();
    this.bg.onload = () => ctx.drawImage(this.bg, 0, 0, this.DIMX, this.DIMY);
    this.bg.src = "dist/assets/db_bg.jpg";
    this.resetLevel = this.resetLevel.bind(this);
  }

  setDimensions() {
    this.DIMX = 1000;
    this.DIMY = 600;
    this.FLOOR = this.DIMY - 53;
    this.LWALL = 80;
    this.RWALL = this.DIMX - 80;
  }

  remove(o) {
    if (o instanceof Bubble) {
      this.bubbles.splice(this.bubbles.indexOf(o), 1);
      if (o.canDivide) o.divide();
    } else {
      this.resetProjectile();
    }
  }

  addBubble(opts) {
    this.bubbles.push(new Bubble(opts, this.ctx, this));
  }

  setProjectile(p) {
    if (Array.isArray(this.projectile)) this.projectile = p;
  }

  resetProjectile() {
    this.projectile = [];
  }

  allObjs() {
    return Array.isArray(this.projectile)
      ? this.projectile.concat(this.bubbles, this.player)
      : [this.projectile].concat(this.bubbles, this.player);
  }

  movingObjs() {
    return this.bubbles.concat(this.projectile);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    ctx.drawImage(this.bg, 0, 0, this.DIMX, this.DIMY);
    ctx.font = "24px Orbitron";
    ctx.fillStyle = "white";
    ctx.fillText(
      `${this.player.lives >= 0 ? this.player.lives : "0"} ${
        this.player.lives === 1 ? "life" : "lives"
      } left`,
      this.LWALL + 15,
      25,
      150
    );
    ctx.fillText(`level ${this.level}`, this.DIMX / 2 - 50, 25, 100);
    this.allObjs().forEach((b) => b.draw(ctx));
  }

  move(delta) {
    this.movingObjs().forEach((o) => o.move(delta));
  }

  checkCollisions() {
    this.bubbles.forEach((b) => {
      if (b.isCollidedWith(this.player)) {
        this.player.decrementLife();
        this.checkStatus("p");
      } else if (b.isCollidedWith(this.projectile)) {
        this.remove(b);
        this.resetProjectile();
        this.checkStatus("b");
      }
    });
  }

  checkStatus(type) {
    if (type === "p") {
      if (!this.player.lives) {
        this.over = true;
      } else {
        this.resetLevel();
      }
    }

    if (!this.bubbles.length) {
      this.level++;
      this.resetLevel();
    }
  }

  resetLevel() {
    this.clear();
    switch (this.level) {
      case 1:
        this.addBubble({
          pos: [this.LWALL + 42, 200],
          vel: [15, 15],
          radius: 20,
          color: "red",
        });
        break;
      case 2:
        this.addBubble({
          pos: [this.LWALL + 63, 200],
          vel: [15, 15],
          radius: 30,
          color: "red",
        });
        break;
      case 3:
        this.addBubble({
          pos: [this.LWALL + 84, 200],
          vel: [15, 15],
          radius: 40,
          color: "red",
        });
        break;
      case 4:
        this.addBubble({
          pos: [this.LWALL + 84, 200],
          vel: [15, 15],
          radius: 40,
          color: "red",
        });
        this.addBubble({
          pos: [this.RWALL - 84, 200],
          vel: [-15, 15],
          radius: 40,
          color: "red",
        });
        break;
      default:
        break;
    }
    this.togglePause();
  }

  togglePause() {
    this.pause = !this.pause;
  }

  clear() {
    this.bubbles = [];
    this.resetProjectile();
    this.player.reset();
  }

  step(delta) {
    this.move(delta);
    this.checkCollisions();
  }
}

module.exports = Game;
