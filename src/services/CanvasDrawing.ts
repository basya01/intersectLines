import { Coords } from '../models/Coords';

export class CanvasDrawing {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawCircle(coords: Coords) {
    this.ctx.beginPath();
    this.ctx.arc(coords.x, coords.y, 4, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'red';
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawLine(line: { moveTo: Coords; lineTo: Coords }) {
    this.ctx.beginPath();
    this.ctx.moveTo(line.moveTo.x, line.moveTo.y);
    this.ctx.lineTo(line.lineTo.x, line.lineTo.y);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
