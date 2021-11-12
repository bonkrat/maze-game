import { Cell } from ".";
import { Maze } from ".";

export class MazeRenderer {
  document: Document;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  timestamp: number;

  constructor(document: Document) {
    this.canvas = document.getElementById("maze") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");

    return this;
  }

  private drawLine(
    cellX: number,
    cellY: number,
    cellSize: number,
    wall: string,
    lineColor: string
  ) {
    this.ctx.imageSmoothingEnabled = false;
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
    this.ctx.lineWidth = 40;
    this.ctx.strokeStyle = lineColor;
    this.ctx.stroke();
  }

  private drawCell(cell: Cell, cellSize: number, lineColor: string) {
    // TODO FIX THESE COORDS!!
    const cellX = cell.y * cellSize;
    const cellY = cell.x * cellSize;

    cell.walls.forEach((wall) => {
      this.drawLine(cellX, cellY, cellSize, wall, lineColor);
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
      const offset = (Math.sin(this.timestamp / 3000) * cellSize) / 10;
      this.ctx.fillStyle = "pink";
      const endSize = cellSize / 2;
      this.ctx.fillRect(
        cellX + (cellSize - endSize) / 2,
        cellY + (cellSize - endSize) / 2 + offset,
        endSize,
        endSize
      );
      this.ctx.fillStyle = lineColor;
    }
  }

  paint(maze: Maze, lineColor: string, timestamp: number) {
    const cellWidth = this.canvas.width / maze.size;
    this.timestamp = timestamp;

    for (var i = 0; i < maze.length; i++) {
      this.drawCell(maze[i], cellWidth, lineColor);
    }
  }
}
