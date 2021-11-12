import { Game, GameRenderer } from "./class";

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

let canvas = document.getElementById("maze");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const size = 6;
const gameRenderer = new GameRenderer(canvas.width / size / 2);
const game = new Game(size);

const render = (timestamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.width);
  gameRenderer.draw(game, timestamp);
};

let previousTimeStamp, start;
function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    game.update();
    render(timestamp);
  }

  // if (elapsed < 2000) {
  previousTimeStamp = timestamp;
  requestAnimationFrame(step);
  // }
}

window.requestAnimationFrame(step);
