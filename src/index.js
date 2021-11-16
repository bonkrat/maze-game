import { Game, GameRenderer } from "./class";

const canvas = document.getElementById("maze"),
  ctx = canvas.getContext("2d"),
  size = 5,
  gameRenderer = new GameRenderer(canvas.width / size / 3),
  game = new Game(size, 60);

let previousTimeStamp, start;
function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }

  if (previousTimeStamp !== timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameRenderer.draw(game, timestamp);
  }

  previousTimeStamp = timestamp;
  requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
