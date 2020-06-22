const Bubble = require("./bubble");

const diff = {
  1: [10],
  2: [20],
  3: [40],
  4: [40, 40],
};

class Game {
  constructor() {
    this.DIMX = 1000;
    this.DIMY = 600;
    this.level = 1;
    this.bubbles = [];
    this.addBubble({ pos: [50, 300], vel: [10, 10], radius: 40, color: "red" });
    this.startingPos = [Math.floor(this.DIMX / 5), Math.floor(this.DIMY / 4)];
  }

  removeBubble(b) {
    this.bubbles.splice(this.bubbles.indexOf(b), 1);
    if (b.canDivide) b.divide();
  }

  addBubble(opts) {
    this.bubbles.push(new Bubble(opts, this));
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.DIMX, this.DIMY);
    // ctx.drawImage(img, 0, 0);
    this.bubbles.forEach((b) => b.draw(ctx));
  }

  moveBubbles(delta) {
    this.bubbles.forEach((b) => b.move(delta));
  }
}

module.exports = Game;
