import { Maze } from "./Maze";
import { MazeManager } from "./MazeManager";

test("builds a maze", () => {
  const maze = new Maze(10);
  MazeManager.build(maze);

  expect(maze.length).toBe(100);
  expect(maze.getGraphSize()).toBe(100);
});
