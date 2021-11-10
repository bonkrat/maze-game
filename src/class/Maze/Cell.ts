export type Wall = "top" | "right" | "bottom" | "left";

export const WALLS: Wall[] = ["top", "right", "bottom", "left"];

class Walls extends Set<Wall> {
  add(item: Wall) {
    return super.add(item);
  }

  equals(walls: Walls) {
    let result = true;
    this.forEach((w) => {
      if (!walls.has(w)) {
        result = false;
      }
    });

    return result;
  }
}

export class Cell {
  x: number;
  y: number;
  walls: Walls;
  pathed: boolean;
  start: boolean;
  end: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.walls = new Walls();
    WALLS.forEach((pos) => this.walls.add(pos as Wall));
    this.pathed = false;
  }
}
