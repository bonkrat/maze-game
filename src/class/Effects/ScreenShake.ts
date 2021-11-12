import { Wall } from "../Maze/Cell";
import { Effect } from "./Effect";

export class ScreenShake extends Effect {
  position: Wall;

  constructor(timestamp: number, position: Wall) {
    super(timestamp, 100);
    this.position = position;
  }
}
