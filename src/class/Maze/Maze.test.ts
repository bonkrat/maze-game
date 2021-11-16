import { Cell } from ".";
import { Maze } from "./Maze";

let maze;

beforeEach(() => {
  maze = new Maze(10, 500);
});

test("initializes cells", () => {
  expect(maze.length).toEqual<number>(500);
});

test("gets a cell", () => {
  const expectedCell = new Cell(1, 2);
  expect(maze.getCell(1, 2)).toEqual<Cell>(expectedCell);
});

test("gets a cell value", () => {
  const expectedCell = new Cell(1, 2);
  expect(maze.getCellValue(expectedCell)).toEqual<number>(101);
});
