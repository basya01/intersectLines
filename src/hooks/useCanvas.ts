import { useEffect, useRef, useState } from 'react';
import { Coords } from '../models/Coords';
import { CanvasDrawing } from '../services/CanvasDrawing';

export const useCanvas = (width: number, height: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasCoords, setCanvasCoords] = useState<DOMRect>();
  const [cursorCoords, setCursorCoords] = useState<Coords>();
  const [canvasService, setCanvasService] = useState<CanvasDrawing>();

  useEffect(() => {
    setCanvasCoords(canvasRef.current?.getBoundingClientRect());

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      setCanvasService(new CanvasDrawing(ctx, width, height));
    }

    canvasRef.current?.addEventListener('mousemove', (e) => {
      setCursorCoords({
        x: e.clientX - (canvasCoords?.left || 0) - 2,
        y: e.clientY - (canvasCoords?.top || 0) - 2,
      });
    });
  }, [canvasRef.current?.width, canvasRef.current?.width]);

  return { canvasRef, cursorCoords, canvasService } as {canvasRef: React.RefObject<HTMLCanvasElement>, cursorCoords: Coords, canvasService: CanvasDrawing};
};
