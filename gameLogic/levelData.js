import { WALL, FREE } from "./types";

export const allLevels = [
  {
    maze: [
      [FREE, FREE, FREE, FREE],
      [WALL, WALL, WALL, WALL],
      [WALL, WALL, WALL, WALL],
      [WALL, WALL, WALL, WALL],
    ],
    finishPosition: [3, 0],
  },
  {
    maze: [
      [FREE, WALL, WALL, WALL],
      [FREE, FREE, FREE, FREE],
      [WALL, WALL, WALL, WALL],
      [WALL, WALL, WALL, WALL],
    ],
    finishPosition: [3, 1],
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
  {
    maze: [
      [FREE, FREE, WALL, WALL, WALL],
      [WALL, FREE, FREE, FREE, WALL],
      [FREE, FREE, WALL, FREE, WALL],
      [FREE, WALL, FREE, FREE, FREE],
    ],
    finishPosition: [4, 3],
  },
  {
    maze: [
      [FREE, FREE, WALL, FREE, FREE],
      [WALL, FREE, FREE, WALL, WALL],
      [FREE, FREE, WALL, WALL, WALL],
      [FREE, WALL, WALL, WALL, FREE],
      [FREE, FREE, FREE, FREE, FREE],
    ],
    finishPosition: [4, 3],
  },
  {
    maze: [
      [FREE, FREE, WALL, FREE, FREE, FREE],
      [WALL, FREE, FREE, FREE, WALL, FREE],
      [WALL, WALL, FREE, WALL, FREE, FREE],
      [FREE, FREE, FREE, WALL, FREE, WALL],
      [FREE, WALL, WALL, WALL, FREE, FREE],
      [FREE, FREE, FREE, WALL, WALL, WALL],
      [WALL, WALL, FREE, FREE, FREE, FREE],
    ],
    finishPosition: [5, 6],
  },
  {
    maze: [
      [FREE, FREE, FREE, FREE, WALL, FREE, FREE],
      [FREE, WALL, WALL, FREE, WALL, FREE, WALL],
      [WALL, FREE, WALL, FREE, FREE, FREE, FREE],
      [WALL, WALL, FREE, FREE, WALL, WALL, FREE],
      [FREE, FREE, FREE, WALL, FREE, FREE, FREE],
      [WALL, FREE, WALL, FREE, FREE, WALL, WALL],
      [FREE, WALL, FREE, FREE, WALL, FREE, FREE],
      [FREE, WALL, FREE, WALL, FREE, FREE, WALL],
      [FREE, WALL, FREE, FREE, FREE, WALL, FREE],
    ],
    finishPosition: [6, 6],
  },
];
