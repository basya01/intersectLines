import { useState } from 'react';
import './App.css';
import { clearCanvas } from './CanvasAPI/clearCanvas';
import { drawCircle } from './CanvasAPI/drawCircle';
import { drawLine } from './CanvasAPI/drawLine';
import Button from './components/Button/Button';
import Canvas from './components/Canvas';
import { useCanvas } from './hooks/useCanvas';
import { History } from './models/History';
import { Line } from './models/Line';
import { calcShorterLine } from './utils/calcShorterLine';
import { intersect } from './utils/intersect';

const App = () => {
  const { canvasRef, ctx, cursorCoords } = useCanvas();
  const [history, setHistory] = useState<History>({ lines: [], circles: [] });
  const width = 800;
  const height = 500;

  const buttonHandler = () => {
    const animationLines: Line[] = JSON.parse(JSON.stringify(history.lines));
    let animationCircles: Line[] = [];
    const stopAnimation = new Set();

    const drawFrame = () => {
      if (!ctx) return;
      clearCanvas(ctx, width, height);
      animationCircles = [];

      animationLines.forEach((line, index, arr) => {
        if (!cursorCoords) return;

        const newLine = calcShorterLine(line);
        drawLine(ctx, newLine);

        if (newLine.moveTo.x === newLine.lineTo.x) {
          stopAnimation.add(index);
        } else {
          arr[index] = newLine;
          animationCircles.push(newLine);
        }
      });

      animationCircles.forEach((line, index, arr) => {
        for (let i = index; i < arr.length; i++) {
          const circleCoords = intersect(
            line.moveTo.x,
            line.moveTo.y,
            line.lineTo?.x,
            line.lineTo?.y,
            arr[i].moveTo.x,
            arr[i].moveTo.y,
            arr[i].lineTo.x,
            arr[i].lineTo.y
          );
          
          if (circleCoords) {
            drawCircle(ctx, circleCoords);
          }
        }
      });
      
      if (animationLines.length !== stopAnimation.size) {
        requestAnimationFrame(drawFrame);
      }
    };

    setHistory({ lines: [], circles: [] });
    requestAnimationFrame(drawFrame);
  };

  return (
    <div className="App">
      <Canvas
        history={history}
        setHistory={setHistory}
        canvasRef={canvasRef}
        ctx={ctx}
        cursorCoords={cursorCoords}
        width={width}
        height={height}
      />
      <Button onClick={buttonHandler}>Collaps lines</Button>
    </div>
  );
};

export default App;
