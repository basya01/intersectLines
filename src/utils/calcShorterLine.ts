import { Line } from '../models/Line';

export const calcShorterLine = ({ moveTo, lineTo, lengthX }: Line, step: number) => {
  const moveToX = moveTo.x - lineTo.x > 0 ? moveTo.x - step : moveTo.x + step;
  const lineToX = moveTo.x - lineTo.x > 0 ? lineTo.x + step : lineTo.x - step;
    
  const newMoveTo = {
    x: moveToX,
    y:
      ((moveToX - moveTo.x) * (lineTo.y - moveTo.y)) / (lineTo.x - moveTo.x) +
      moveTo.y,
  };
  const newLineTo = {
    x: lineToX,
    y:
      ((lineToX - moveTo.x) * (lineTo.y - moveTo.y)) / (lineTo.x - moveTo.x) +
      moveTo.y,
  };

  if (Math.abs(moveToX - lineToX) < 1) {
    return {
      moveTo: newMoveTo,
      lineTo: newMoveTo,
    };
  }

  return {
    moveTo: newMoveTo,
    lineTo: newLineTo,
    lengthX
  };
};
