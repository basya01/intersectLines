import { useEffect, useRef, useState } from 'react';
import { Coords } from '../models/Coords';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasCoords, setCanvasCoords] = useState<DOMRect>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [cursorCoords, setCursorCoords] = useState<Coords>();

  useEffect(() => {
    setCanvasCoords(canvasRef.current?.getBoundingClientRect());
    setCtx(canvasRef.current?.getContext('2d'));
  }, []);

  canvasRef.current?.addEventListener('mousemove', (e) => {
    setCursorCoords({
      x: e.clientX - (canvasCoords?.left || 0) - 2,
      y: e.clientY - (canvasCoords?.top || 0) - 2,
    });
  });

  return { canvasRef, ctx, cursorCoords};
};
