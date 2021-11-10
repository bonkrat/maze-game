import { Cell } from ".";
import { Maze } from "./Maze";

let maze;

beforeEach(() => {
  maze = new Maze(10);
});

test("initializes cells", () => {
  expect(maze.length).toEqual<number>(100);
});

test("gets a cell", () => {
  const expectedCell = new Cell(1, 2);
  expect(maze.getCell(1, 2)).toEqual<Cell>(expectedCell);
});

test("gets a cell value", () => {
  const expectedCell = new Cell(1, 2);
  expect(maze.getCellValue(expectedCell)).toEqual<number>(21);
});

// test("gets neighbors to a cell", () => {
//   const cell = new Cell(1, 2);

//   const expectedCells = [
//     new Cell(1, 1),
//     new Cell(1, 3),
//     new Cell(0, 2),
//     new Cell(2, 2),
//   ];

//   expect(maze.getNeighbors(cell)).toEqual<Cell[]>(expectedCells);
// });
