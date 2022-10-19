import { History } from "../models/History";
import { Line } from "../models/Line";
import { calcShorterLine } from "../utils/calcShorterLine";
import { intersect } from "../utils/intersect";
import { CanvasDrawing } from "./CanvasDrawing";

export class CanvasAnimation {
  cs: CanvasDrawing;
  stopAnimation: Set<number>;
  animationLines: Line[];
  animationCircles: Line[];

  constructor(canvasService: CanvasDrawing, history: History) {
    this.cs = canvasService;
    this.animationLines = JSON.parse(JSON.stringify(history.lines));
    this.animationCircles = [];
    this.stopAnimation = new Set();
  }

  drawShorterLines() {
    this.animationCircles.splice(0, this.animationCircles.length);

    this.animationLines.forEach((line, index, arr) => {
      const newLine = calcShorterLine(line, line.lengthX / 360);
      this.cs.drawLine(newLine);

      if (newLine.moveTo.x === newLine.lineTo.x) {
        this.stopAnimation.add(index);
      } else {
        if (newLine.lengthX) {
          arr[index] = newLine;
          this.animationCircles.push(newLine);
        }
      }
    });
  }

  drawCircles() {
    this.animationCircles.forEach((line, index, arr) => {
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
          this.cs.drawCircle(circleCoords);
        }
      }
    });
  }
}