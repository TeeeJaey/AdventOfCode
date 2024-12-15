import { getGrid, getMoves } from "./data.js";
const print = console.log;
const printGrid = (grid) => print(grid.map((l) => l.join("")));

const grid = getGrid()
  .split("\n")
  .map((line) => line.split(""));
const moves = getMoves().split("\n").join("").split("");

const DIRECTION = { UP: "^", RIGHT: ">", DOWN: "v", LEFT: "<" };
const BOX = "O";
const ROBOT = "@";
const EMPTY = ".";
const WALL = "#";
const MOVEMENT = {
  [DIRECTION.UP]: [-1, 0],
  [DIRECTION.RIGHT]: [0, 1],
  [DIRECTION.DOWN]: [1, 0],
  [DIRECTION.LEFT]: [0, -1],
};

const getStart = () => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === ROBOT) return { row, col };
    }
  }
};
const start = getStart();

let curr = { ...start };
moves.forEach((move) => {
  const delta = MOVEMENT[move];
  const next = { row: curr.row + delta[0], col: curr.col + delta[1] };
  if (grid[next.row][next.col] === WALL) {
    return;
  }

  const moveBox = (row, col) => {
    if (grid[row][col] === EMPTY) {
      return true;
    }
    if (grid[row][col] === BOX) {
      const boxMoved = moveBox(row + delta[0], col + delta[1]);
      if (boxMoved) {
        grid[row + delta[0]][col + delta[1]] = BOX;
        grid[row][col] = EMPTY;
        return true;
      }
    }
    return false;
  };

  if (grid[next.row][next.col] === BOX) moveBox(next.row, next.col);

  if (grid[next.row][next.col] === EMPTY) {
    grid[next.row][next.col] = ROBOT;
    grid[curr.row][curr.col] = EMPTY;
    curr = { ...next };
    return;
  }
});

// printGrid(grid);

let part1 = 0;
grid.forEach((row, rowIndex) => {
  row.forEach((item, colIndex) => {
    if (item === BOX) {
      part1 += 100 * rowIndex + colIndex;
    }
  });
});

print(part1); // 1552463
