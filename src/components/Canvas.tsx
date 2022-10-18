import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { clearCanvas } from '../CanvasAPI/clearCanvas';
import { drawCircle } from '../CanvasAPI/drawCircle';
import { drawLine } from '../CanvasAPI/drawLine';
import { Coords } from '../models/Coords';
import { History } from '../models/History';
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
  const [moveTo, setMoveTo] = useState<Coords>();
  const [currentCircles, setCurrentCircles] = useState({});
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;

    setMoveTo(cursorCoords);
    setIsMouseDown(true);
  };

  const mouseUpHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!moveTo || !cursorCoords) return;

    setHistory({
      lines: [
        ...history.lines,
        {
          moveTo,
          lineTo: cursorCoords,
        },
      ],
      circles: [...history.circles, currentCircles],
    });
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !isMouseDown || !moveTo || !cursorCoords) return;

    setCurrentCircles({});

    clearCanvas(ctx, width, height);
    drawLine(ctx, {
      moveTo,
      lineTo: { x: cursorCoords.x, y: cursorCoords.y },
    });

    history.lines.forEach((line, index) => {
      drawLine(ctx, line);

      const circleCoords = intersect(
        line.moveTo.x,
        line.moveTo.y,
        line.lineTo?.x,
        line.lineTo?.y,
        moveTo.x,
        moveTo.y,
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
      onMouseMove={mouseMoveHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      id="canvas"
      width={width}
      height={height}
    ></canvas>
  );
};

export default Canvas;
