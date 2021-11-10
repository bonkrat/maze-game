import { Maze, MazeManager, MazeRenderer } from "./class";

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

const size = 5;
const maze = new Maze(size);
MazeManager.build(maze);

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

const coords = randomStartEnd();
MazeManager.solve(coords[0], coords[1], maze);
new MazeRenderer(document).paint(maze);
