import { Coords } from '../models/Coords';

export const calcLineLength = (p1: Coords, p2: Coords) =>{
  return Math.sqrt(Math.abs((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2));
}
