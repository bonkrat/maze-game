import { Maze } from "./Maze";
import { MazeManager } from "./MazeManager";

test("builds a maze", () => {
  const maze = new Maze(10, 50);
  MazeManager.build(maze);

  expect(maze.length).toBe(50);
  expect(maze.getGraphSize()).toBe(50);
});

// TODO Write better tests for maze generation.
