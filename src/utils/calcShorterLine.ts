import { Line } from '../models/Line';

export const calcShorterLine = ({ moveTo, lineTo }: Line) => {
  const moveToX = moveTo.x - lineTo.x > 0 ? moveTo.x - 1 : moveTo.x + 1;
  const lineToX = moveTo.x - lineTo.x > 0 ? lineTo.x + 1 : lineTo.x - 1;
    
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

  if (Math.abs(moveToX - lineToX) === 1) {
    return {
      moveTo: newMoveTo,
      lineTo: newMoveTo,
    };
  }

  return {
    moveTo: newMoveTo,
    lineTo: newLineTo,
  };
};
