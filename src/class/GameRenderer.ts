import { Game, Maze, MazeRenderer, Player, Wall } from ".";
import { PlayerBump } from "./Effects/PlayerBump";
import { PlayerTail } from "./Effects/PlayerTail";
import { ScreenShake } from "./Effects/ScreenShake";
import { WALLS } from "./Maze/Cell";

export class GameRenderer {
  playerSize: number;
  document: Document;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mazeRenderer: MazeRenderer;
  backgroundColor: string;
  color: string;
  timestamp: number;
  previousTimestamp: number;
  previousPosition: Player;
  playerTrails: PlayerTail[];
  playerBump: PlayerBump;
  screenShake: ScreenShake[];
  screenPos: { x: number; y: number };

  constructor(playerSize: number) {
    this.playerSize = playerSize;
    this.canvas = document.getElementById("maze") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.mazeRenderer = new MazeRenderer(document);
    this.color = "white";
    this.backgroundColor = "#0C0C0C";
    this.playerTrails = [];
    this.playerBump = new PlayerBump(this.timestamp, "top");
    this.screenShake = [];
    this.screenPos = { x: 0, y: 0 };

    WALLS.forEach((pos: Wall) => {
      document.addEventListener(`collide${pos}`, () => {
        this.screenShake.push(new ScreenShake(this.timestamp, pos));
      });
    });
  }

  resetScreen() {
    // TODO Refactor into ctx.save(); and ctx.reset();
    this.ctx.translate(-this.screenPos.x, -this.screenPos.y);
    this.screenPos.x = 0;
    this.screenPos.y = 0;
  }

  drawMaze(maze: Maze) {
    this.ctx.fillStyle = this.backgroundColor;

    // Shake canvas
    if (this.screenShake.length) {
      this.screenShake.forEach((shake, i) => {
        const dt = this.timestamp - shake.timestamp;
        const jiggleAmount = 15;

        if (dt < shake.duration) {
          let xPos = 0,
            yPos = 0;
          if (["left", "right"].includes(shake.position)) {
            xPos = Math.floor(Math.sin(dt) * jiggleAmount);
            this.ctx.translate(-this.screenPos.x, -this.screenPos.y);
          } else {
            yPos = Math.floor(Math.sin(dt) * jiggleAmount);
            this.ctx.translate(-this.screenPos.x, -this.screenPos.y);
          }

          this.screenPos.x = xPos;
          this.screenPos.y = yPos;
          this.ctx.translate(xPos, yPos);
        } else {
          // Remove stale shakes
          // TODO Refactor to not remove screen shakes.
          if (this.screenShake.length === 1) {
            this.screenShake = [];
          } else {
            this.screenShake = this.screenShake.splice(i, 1);
          }
        }
      });
    }

    new MazeRenderer(document).paint(maze, this.color, this.timestamp);
  }

  drawPlayerTail(maze: Maze) {
    this.ctx.fillStyle = this.color;

    this.playerTrails.forEach((tail: PlayerTail, i) => {
      const dt = this.timestamp - tail.timestamp;
      if (dt < tail.duration) {
        const cellSize = this.canvas.width / maze.size - dt / 1000;
        const tailSize = this.playerSize * ((1000 - dt) / 1000);

        this.ctx.fillStyle = `rgba(255, 255, 255, ${(80 / dt).toPrecision(1)})`;

        this.ctx.fillRect(
          tail.x * cellSize + (cellSize - tailSize) / 2,
          tail.y * cellSize + (cellSize - tailSize) / 2,
          tailSize,
          tailSize
        );
      }
    });
  }

  drawPlayer(player: Player, maze: Maze) {
    if (!this.previousPosition) {
      this.previousPosition = { ...player };
    }

    const cellSize = this.canvas.width / maze.size;

    // Add player movement effects.
    if (this.previousPosition.x !== player.x) {
      if (this.previousPosition.x > player.x) {
        for (var i = this.previousPosition.x; i > player.x; i--) {
          this.playerBump.timestamp = this.timestamp;
          this.playerBump.position = "left";

          this.playerTrails.push(
            new PlayerTail(this.timestamp, i, this.previousPosition.y)
          );
        }
      } else {
        for (var i = this.previousPosition.x; i < player.x; i++) {
          this.playerBump.timestamp = this.timestamp;
          this.playerBump.position = "right";

          this.playerTrails.push(
            new PlayerTail(this.timestamp, i, this.previousPosition.y)
          );
        }
      }
    } else if (this.previousPosition.y !== player.y) {
      if (this.previousPosition.y > player.y) {
        for (var i = this.previousPosition.y; i > player.y; i--) {
          this.playerBump.timestamp = this.timestamp;
          this.playerBump.position = "top";

          this.playerTrails.push(
            new PlayerTail(this.timestamp, this.previousPosition.x, i)
          );
        }
      } else {
        for (var i = this.previousPosition.y; i < player.y; i++) {
          this.playerBump.timestamp = this.timestamp;
          this.playerBump.position = "bottom";

          this.playerTrails.push(
            new PlayerTail(this.timestamp, this.previousPosition.x, i)
          );
        }
      }
    }

    this.drawPlayerTail(maze);

    this.ctx.fillStyle = this.color;

    // Draw bump
    let offsetX = 0,
      offsetY = 0;
    if (
      this.timestamp - this.playerBump.timestamp <=
      this.playerBump.duration
    ) {
      const bumpAmount = this.playerSize / 2;
      switch (this.playerBump.position) {
        case "left":
          offsetX -= bumpAmount;
          break;
        case "right":
          offsetX += bumpAmount;
          break;
        case "bottom":
          offsetY += bumpAmount;
          break;
        case "top":
          offsetY -= bumpAmount;
          break;
        default:
          break;
      }
    }

    this.ctx.fillRect(
      player.x * cellSize + (cellSize - this.playerSize) / 2 + offsetX,
      player.y * cellSize + (cellSize - this.playerSize) / 2 + offsetY,
      this.playerSize,
      this.playerSize
    );

    this.previousPosition = { ...player };

    this.ctx.fillStyle = this.backgroundColor;
  }

  draw(game: Game, timestamp: number) {
    this.timestamp = timestamp;

    if (!this.previousTimestamp) {
      this.previousTimestamp = timestamp;
    }

    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);

    this.drawMaze(game.maze);
    this.drawPlayer(game.player, game.maze);
  }
}
