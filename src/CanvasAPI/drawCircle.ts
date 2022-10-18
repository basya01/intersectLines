import { Coords } from "../models/Coords";

export const drawCircle = (ctx: CanvasRenderingContext2D, coords: Coords) => {
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'red';
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};
