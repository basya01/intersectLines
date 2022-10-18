import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { clearCanvas } from '../CanvasAPI/clearCanvas';
import { drawCircle } from '../CanvasAPI/drawCircle';
import { drawLine } from '../CanvasAPI/drawLine';
import { Coords } from '../models/Coords';
import { History } from '../models/History';
import { calcLineLength } from '../utils/calcLineLength';
import { intersect } from '../utils/intersect';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cursorCoords: Coords | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;
  history: History;
  setHistory: Dispatch<SetStateAction<History>>;
  width: number;
  height: number;
}

const Canvas: FC<CanvasProps> = ({
  canvasRef,
  ctx,
  cursorCoords,
  history,
  setHistory,
  width,
  height,
}) => {
  const [currentMoveTo, setCurrentMoveTo] = useState<Coords | null>(null);
  const [currentCircles, setCurrentCircles] = useState({});

  const clickHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!cursorCoords) return;

    setCurrentMoveTo(cursorCoords);
    if (currentMoveTo) {
      setCurrentMoveTo(null);
      setHistory({
        lines: [
          ...history.lines,
          {
            moveTo: currentMoveTo,
            lineTo: cursorCoords,
            lengthX: Math.abs(currentMoveTo.x - cursorCoords.x),
          },
        ],
        circles: [...history.circles, currentCircles],
      });
    }
  };

  const rightClickHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    if (currentMoveTo && ctx) {
      clearCanvas(ctx, width, height);

      history.lines.forEach((line) => {
        drawLine(ctx, line);
      });

      history.circles.forEach((dots) =>
        Object.values(dots).forEach((dot) => drawCircle(ctx, dot))
      );
    }

    setCurrentMoveTo(null);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !currentMoveTo || !cursorCoords) return;

    setCurrentCircles({});

    clearCanvas(ctx, width, height);
    drawLine(ctx, {
      moveTo: currentMoveTo,
      lineTo: { x: cursorCoords.x, y: cursorCoords.y },
    });

    history.lines.forEach((line, index) => {
      drawLine(ctx, line);

      const circleCoords = intersect(
        line.moveTo.x,
        line.moveTo.y,
        line.lineTo?.x,
        line.lineTo?.y,
        currentMoveTo.x,
        currentMoveTo.y,
        cursorCoords.x,
        cursorCoords.y
      );

      if (circleCoords) {
        drawCircle(ctx, circleCoords);
        setCurrentCircles((currentCircles) => ({
          ...currentCircles,
          [index]: circleCoords,
        }));
      }
    });

    history.circles.forEach((dots) =>
      Object.values(dots).forEach((dot) => drawCircle(ctx, dot))
    );
  };

  return (
    <canvas
      ref={canvasRef}
      onContextMenu={rightClickHandler}
      onMouseMove={mouseMoveHandler}
      onClick={clickHandler}
      id="canvas"
      width={width}
      height={height}
    ></canvas>
  );
};

export default Canvas;
