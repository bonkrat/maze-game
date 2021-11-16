import { Cell } from ".";
import { Graph } from "..";

export class Maze extends Array {
  size: number;
  graph: Graph;
  height: number;

  /**
   * @param size The number of horizontal cells
   * @param height The height of the maze in pixels.
   */
  constructor(size: number, height: number) {
    super();
    this.size = size;
    this.height = height;
    this.graph = new Graph();

    // Initialize cells.
    // TODO Fix the cell order. Currently 'x' is the vertical axis and 'y' is the horizontal axis!
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < height / size; j++) {
        super.push(new Cell(j, i));
      }
    }
  }

  getEndCell(): Cell {
    return this.filter((c: Cell) => c.end)[0];
  }

  /**
   * Returns the cell at the x and y coordinates
   * @returns
   */
  getCell(x: number, y: number): Cell {
    return this[x + (this.height / this.size) * y];
  }

  /**
   * Returns the index of the cell in the maze array.
   * @param cell
   * @returns
   */
  getCellValue(cell: Cell) {
    return cell.x + (this.height / this.size) * cell.y;
  }

  addGraphEdge(source: Cell, destination: Cell) {
    this.graph.addEdge(
      this.getCellValue(source),
      this.getCellValue(destination)
    );
  }

  getGraphSize() {
    return this.graph.size;
  }
}
