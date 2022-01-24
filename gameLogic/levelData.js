import { WALL, FREE } from "./types";

export const allLevels = [
  {
    maze: [
      [FREE, FREE, FREE, WALL],
      [WALL, WALL, FREE, WALL],
      [WALL, WALL, FREE, FREE],
      [WALL, WALL, WALL, WALL],
    ],
    finishPosition: [3, 2],
  },
  {
    maze: [
      [FREE, WALL, WALL, WALL],
      [FREE, FREE, WALL, WALL],
      [WALL, FREE, FREE, WALL],
      [WALL, WALL, FREE, FREE],
    ],
    finishPosition: [3, 3],
  },
];
