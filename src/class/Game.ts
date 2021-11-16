import { Maze, MazeManager, Player, Wall } from ".";

export class Game {
  player: Player;
  maze: Maze;
  size: number;
  height: number;

  /**
   *
   * @param size The number of horizontal cells.
   * @param height The height in pixels.
   */
  constructor(size = 10, height = 10) {
    this.size = size;
    this.height = height;
    this.generateMaze();
    this.initializePlayer();
  }

  generateMaze() {
    this.maze = new Maze(this.size, this.height);
    MazeManager.build(this.maze);

    const randomCell = () => ({
      x: Math.floor(Math.random() * this.maze.size),
      y: Math.floor(Math.random() * this.maze.size),
    });

    const randomStartEnd = () => {
      return [randomCell(), this.maze[this.maze.length - 1]];
    };

    const coords = randomStartEnd();
    MazeManager.solve(coords[0], coords[1], this.maze);
  }

  initializePlayer() {
    this.player = new Player(0, 0);
    document.addEventListener("keydown", this.updatePlayer.bind(this));
    ["swipeRight", "swipeLeft", "swipeUp", "swipeDown"].forEach((dir) =>
      document.addEventListener(dir, this.updatePlayerSwipe.bind(this))
    );
  }

  private jumpPlayerPosition(direction: Wall) {
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

  updatePlayerSwipe(e: Event) {
    const mazeCell = this.maze.getCell(this.player.y, this.player.x);
    [
      ["swipeUp", "top"],
      ["swipeLeft", "left"],
      ["swipeDown", "bottom"],
      ["swipeRight", "right"],
    ].forEach(([type, pos]) => {
      if (e?.type === type) {
        if (!mazeCell.walls.has(pos as Wall)) {
          this.jumpPlayerPosition(pos);
        } else {
          document.dispatchEvent(new Event(`collide${pos}`));
        }
      }
    });
  }

  updatePlayer(e: KeyboardEvent) {
    // TODO FIX COORDS!!
    const mazeCell = this.maze.getCell(this.player.y, this.player.x);
    [
      ["w", "top"],
      ["a", "left"],
      ["s", "bottom"],
      ["d", "right"],
      ["swipeUp", "top"],
      ["swipeLeft", "left"],
      ["swipeDown", "bottom"],
      ["swipeRight", "right"],
    ].forEach(([key, pos]) => {
      if (e.key === key) {
        if (!mazeCell.walls.has(pos as Wall)) {
          this.jumpPlayerPosition(pos as Wall);
        } else {
          document.dispatchEvent(new Event(`collide${pos}`));
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
}
