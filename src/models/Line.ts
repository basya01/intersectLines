import { Coords } from "./Coords";

export interface Line {
  moveTo: Coords;
  lineTo: Coords;
  lengthX: number;
}