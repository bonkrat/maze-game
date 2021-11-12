import { Wall } from "../Maze/Cell";
import { Effect } from "./Effect";

export class PlayerBump extends Effect {
  position: Wall;

  constructor(timestamp, position) {
    super(timestamp, 50);
    this.position = position;
  }
}
