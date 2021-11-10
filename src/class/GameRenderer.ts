import { Cell, Player } from ".";

export class GameRenderer {
  playerSize: number;
  document: Document;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(playerSize) {
    this.playerSize = playerSize;
    this.canvas = document.getElementById("maze") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }

  drawPlayer(player: Player) {
    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(
      player.x * this.playerSize,
      player.y * this.playerSize,
      this.playerSize,
      this.playerSize
    );
  }
}
