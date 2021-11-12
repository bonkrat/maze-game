import { Effect } from "./Effect";

export class PlayerTail extends Effect {
  x: number;
  y: number;

  constructor(initialTimestamp: number, x: number, y: number) {
    super(initialTimestamp, 100);
    this.x = x;
    this.y = y;
  }
}
