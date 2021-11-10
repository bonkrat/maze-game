import { Cell } from ".";
import { Graph } from "..";

export class Maze extends Array {
  size: number;
  graph: Graph;

  constructor(size: number) {
    super();
    this.size = size;
    this.graph = new Graph();

    // Initialize cells.
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        super.push(new Cell(j, i));
      }
    }
  }

  getEndCell(): Cell {
    return this.filter((c: Cell) => c.end)[0];
  }

  getCell(x: number, y: number): Cell {
    return this[x + this.size * y];
  }

  getCellValue(cell: Cell) {
    return cell.x + this.size * cell.y;
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
