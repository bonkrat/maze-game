import { Maze, MazeManager, Player } from ".";
import { Wall } from "./Maze/Cell";

export class Game {
  player: Player;
  maze: Maze;
  size: number;

  constructor(size = 10) {
    this.size = size;
    this.generateMaze();
    this.initializePlayer(new Player(0, 0));
  }

  generateMaze() {
    this.maze = new Maze(this.size);
    MazeManager.build(this.maze);

    const randomCell = () => ({
      x: Math.floor(Math.random() * this.maze.size),
      y: Math.floor(Math.random() * this.maze.size),
    });

    const randomStartEnd = () => {
      return [randomCell(), randomCell()];
    };

    const coords = randomStartEnd();
    MazeManager.solve(coords[0], coords[1], this.maze);
  }

  initializePlayer(player: Player) {
    this.player = new Player(0, 0);
    document.addEventListener("keydown", this.updatePlayer.bind(this));
  }

  private jumpPlayerPosition(direction) {
    do {
      switch (direction) {
        case "top":
          this.player.y -= 1;
          break;
        case "bottom":
          this.player.y += 1;
          break;
        case "right":
          this.player.x += 1;
          break;
        case "left":
          this.player.x -= 1;
          break;
        default:
          break;
      }
      const end = this.maze.getEndCell();
      if (this.player.y === end.x && this.player.x === end.y) {
        this.reset();
      }
    } while (
      (((direction === "top" || direction === "bottom") &&
        this.maze.getCell(this.player.y, this.player.x).walls.has("left") &&
        this.maze.getCell(this.player.y, this.player.x).walls.has("right")) ||
        ((direction === "left" || direction === "right") &&
          this.maze.getCell(this.player.y, this.player.x).walls.has("top") &&
          this.maze
            .getCell(this.player.y, this.player.x)
            .walls.has("bottom"))) &&
      !this.maze.getCell(this.player.y, this.player.x).walls.has(direction)
    );
  }

  updatePlayer(e) {
    // TODO FIX COORDS!!
    const mazeCell = this.maze.getCell(this.player.y, this.player.x);
    [
      ["w", "top"],
      ["a", "left"],
      ["s", "bottom"],
      ["d", "right"],
    ].forEach(([key, pos]) => {
      if (e.key === key) {
        if (!mazeCell.walls.has(pos as Wall)) {
          this.jumpPlayerPosition(pos);
        } else {
          document.dispatchEvent(new Event("collide"));
        }
      }
    });
  }

  setSize(size) {
    this.size = size;
    this.generateMaze();
  }

  reset() {
    this.generateMaze();
    this.player.x = 0;
    this.player.y = 0;
  }

  update() {}
}
