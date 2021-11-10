import { Cell } from ".";
import { Maze } from ".";

export class MazeRenderer {
  document: Document;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(document: Document) {
    this.canvas = document.getElementById("maze") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");

    return this;
  }

  private drawLine(
    cellX: number,
    cellY: number,
    cellSize: number,
    wall: string
  ) {
    this.ctx.beginPath();

    if (wall === "right") {
      this.ctx.moveTo(cellX + cellSize, cellY);
      this.ctx.lineTo(cellX + cellSize, cellY + cellSize);
    }

    if (wall === "left") {
      this.ctx.moveTo(cellX, cellY);
      this.ctx.lineTo(cellX, cellY + cellSize);
    }

    if (wall === "bottom") {
      this.ctx.moveTo(cellX, cellY + cellSize);
      this.ctx.lineTo(cellX + cellSize, cellY + cellSize);
    }

    if (wall === "top") {
      this.ctx.moveTo(cellX, cellY);
      this.ctx.lineTo(cellX + cellSize, cellY);
    }

    this.ctx.closePath();
    this.ctx.stroke();
  }

  private drawCell(cell: Cell, cellSize: number) {
    // TODO FIX THESE COORDS!!
    const cellX = cell.y * cellSize;
    const cellY = cell.x * cellSize;

    cell.walls.forEach((wall) => {
      this.drawLine(cellX, cellY, cellSize, wall);
    });

    // if (cell.pathed) {
    //   this.ctx.fillStyle = "purple";
    //   this.ctx.fillRect(cellX, cellY, cellSize, cellSize);
    // }

    // if (cell.start) {
    //   this.ctx.fillStyle = "yellow";
    //   this.ctx.fillRect(cellX, cellY, cellSize, cellSize);
    // }

    if (cell.end) {
      this.ctx.fillStyle = "aliceblue";
      this.ctx.fillRect(cellX, cellY, cellSize, cellSize);
    }
  }

  paint(maze: Maze) {
    const cellWidth = this.canvas.width / maze.size;

    for (var i = 0; i < maze.length; i++) {
      this.drawCell(maze[i], cellWidth);
    }
  }
}
