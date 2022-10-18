import { Coords } from '../models/Coords';

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  line: { moveTo: Coords; lineTo: Coords }
) => {
  if (!line.lineTo) return;

  ctx.beginPath();
  ctx.moveTo(line.moveTo.x, line.moveTo.y);
  ctx.lineTo(line.lineTo.x, line.lineTo.y);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
};
