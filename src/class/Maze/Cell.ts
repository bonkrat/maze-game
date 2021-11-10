type Wall = "top" | "right" | "bottom" | "left";

export class Cell {
  x: number;
  y: number;
  walls: Set<Wall>;
  pathed: boolean;
  start: boolean;
  end: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.walls = new Set<Wall>();
    ["top", "right", "bottom", "left"].forEach((pos) =>
      this.walls.add(pos as Wall)
    );
    this.pathed = false;
  }
}
