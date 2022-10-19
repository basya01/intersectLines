import { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Canvas from './components/Canvas';
import { useCanvas } from './hooks/useCanvas';
import { History } from './models/History';
import { CanvasAnimation } from './services/CanvasAnimation';

const App = () => {
  const { canvasRef, cursorCoords, canvasService: cs } = useCanvas(800, 500);
  const [history, setHistory] = useState<History>({ lines: [], circles: [] });

  const buttonHandler = () => {
    const ani = new CanvasAnimation(cs, history);

    function drawFrame() {
      cs.clearCanvas();

      ani.drawShorterLines();
      ani.drawCircles();

      if (ani.animationLines.length !== ani.stopAnimation.size) {
        requestAnimationFrame(drawFrame);
      }
    }

    setHistory({ lines: [], circles: [] });
    requestAnimationFrame(drawFrame);
  };

  return (
    <div className="App">
      <Canvas
        history={history}
        setHistory={setHistory}
        canvasRef={canvasRef}
        cursorCoords={cursorCoords}
        cs={cs}
      />
      <Button onClick={buttonHandler}>Collaps lines</Button>
    </div>
  );
};

export default App;
