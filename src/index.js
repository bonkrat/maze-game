import {
  Game,
  GameRenderer,
  Maze,
  MazeManager,
  MazeRenderer,
  Player,
} from "./class";

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

const size = 10;

const randomCell = () => ({
  x: Math.floor(Math.random() * size),
  y: Math.floor(Math.random() * size),
});

const randomStartEnd = () => {
  return [randomCell(), randomCell()];
};

// let pathLength = 0;
// do {
//   const coords = randomStartEnd();
//   pathLength = maze.findPath(coords[0], coords[1]);
// } while (pathLength < 3);

const gameRenderer = new GameRenderer(500 / size);
const game = new Game(size);

const render = () => {
  let canvas = document.getElementById("maze");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 500, 500);

  new MazeRenderer(document).paint(game.maze);
  gameRenderer.drawPlayer(game.player);
};

let previousTimeStamp, start;
function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    game.update();
    render();
  }

  // if (elapsed < 2000) {
  previousTimeStamp = timestamp;
  requestAnimationFrame(step);
  // }
}

window.requestAnimationFrame(step);
