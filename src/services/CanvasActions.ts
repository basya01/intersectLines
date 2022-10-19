import { Dispatch, SetStateAction } from 'react';
import { Coords } from '../models/Coords';
import { History } from '../models/History';
import { intersect } from '../utils/intersect';
import { CanvasDrawing } from './CanvasDrawing';

export class CanvasActions {
  cs: CanvasDrawing;

  constructor(canvasService: CanvasDrawing) {
    this.cs = canvasService;
  }

  cancelDrawing(
    history: History,
    setCurrentMoveTo: Dispatch<SetStateAction<Coords | null>>
  ) {
    this.cs.clearCanvas();

    history.lines.forEach((line) => {
      this.cs.drawLine(line);
    });

    history.circles.forEach((dots) =>
      Object.values(dots).forEach((dot) => this.cs.drawCircle(dot))
    );
    
    setCurrentMoveTo(null);
  }

  moveLine(
    history: History,
    setCurrentCircles: Dispatch<SetStateAction<{}>>,
    currentMoveTo: Coords | null,
    cursorCoords: Coords
  ) {
    if (!currentMoveTo || !cursorCoords) return;

    this.cs.clearCanvas();
    setCurrentCircles({});

    this.cs.drawLine({
      moveTo: currentMoveTo,
      lineTo: { x: cursorCoords.x, y: cursorCoords.y },
    });

    history.lines.forEach((line, index) => {
      this.cs.drawLine(line);

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
        this.cs.drawCircle(circleCoords);
        setCurrentCircles((currentCircles) => ({
          ...currentCircles,
          [index]: circleCoords,
        }));
      }
    });

    history.circles.forEach((dots) =>
      Object.values(dots).forEach((dot) => this.cs.drawCircle(dot))
    );
  }

  finishDrawing(
    setCurrentMoveTo: Dispatch<SetStateAction<Coords | null>>,
    setHistory: Dispatch<SetStateAction<History>>,
    cursorCoords: Coords,
    currentMoveTo: Coords,
    currentCircles: Record<number, Coords>
  ) {
    setCurrentMoveTo(null);
    setHistory((history) => ({
      lines: [
        ...history.lines,
        {
          moveTo: currentMoveTo,
          lineTo: cursorCoords,
          lengthX: Math.abs(currentMoveTo.x - cursorCoords.x),
        },
      ],
      circles: [...history.circles, currentCircles],
    }));
  }
}
