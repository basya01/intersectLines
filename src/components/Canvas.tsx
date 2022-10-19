import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Coords } from '../models/Coords';
import { History } from '../models/History';
import { CanvasActions } from '../services/CanvasActions';
import { CanvasDrawing } from '../services/CanvasDrawing';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cursorCoords: Coords;
  history: History;
  setHistory: Dispatch<SetStateAction<History>>;
  cs: CanvasDrawing;
}

const Canvas: FC<CanvasProps> = ({
  canvasRef,
  cursorCoords,
  history,
  setHistory,
  cs,
}) => {
  const [currentMoveTo, setCurrentMoveTo] = useState<Coords | null>(null);
  const [currentCircles, setCurrentCircles] = useState({});

  const ca = new CanvasActions(cs);

  const clickHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!cursorCoords) return;

    setCurrentMoveTo(cursorCoords); // Start drawing

    if (currentMoveTo) {
      ca.finishDrawing(
        setCurrentMoveTo,
        setHistory,
        cursorCoords,
        currentMoveTo,
        currentCircles
      );
    }
  };

  const rightClickHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    ca.cancelDrawing(history, setCurrentMoveTo);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    ca.moveLine(history, setCurrentCircles, currentMoveTo, cursorCoords);
  };

  return (
    <canvas
      ref={canvasRef}
      onContextMenu={rightClickHandler}
      onMouseMove={mouseMoveHandler}
      onClick={clickHandler}
      id="canvas"
      width={cs?.width}
      height={cs?.height}
    ></canvas>
  );
};

export default Canvas;
