import { data } from "./data.js";
const print = console.log;
const FILLED = "#";
const EMPTY = ".";

const locks = [];
const keys = [];
const length = 250;

data.split("\n\n").forEach((item) => {
  const grid = item.split("\n").map((line) => line.split(""));
  if (grid[0][0] === FILLED) {
    locks.push(grid);
  } else {
    keys.push(grid);
  }
});

const getColumnLen = (grid, col) => {
  let len = 0;
  if (col < 0 || col > 4) return null;

  if (grid[0][col] === FILLED) {
    let i = 0;
    while (i < grid.length) {
      if (grid[i][col] === EMPTY) break;
      len++;
      i++;
    }
  } else {
    let i = grid.length - 1;
    while (i >= 0) {
      if (grid[i][col] === EMPTY) break;
      len++;
      i--;
    }
  }
  return len - 1;
};

let part1 = 0;
locks.forEach((lock) => {
  keys.forEach((key) => {
    let overlap = false;
    for (let i = 0; i < 5; i++) {
      const lockLen = getColumnLen(lock, i);
      const keyLen = getColumnLen(key, i);
      if (lockLen + keyLen > 5) {
        overlap = true;
        break;
      }
    }

    if (!overlap) part1++;
  });
});
print(part1);
