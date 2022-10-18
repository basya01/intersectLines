import { Coords } from "./Coords";
import { Line } from "./Line";

export interface History {
  lines: Line[];
  circles: Record<number, Coords>[];
}