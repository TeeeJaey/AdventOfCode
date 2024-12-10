import { getData } from "./data.js";

const show = console.log;
const data = await getData();

const grid = data
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));
const showGrid = data
  .trim()
  .split("\n")
  .map((line) => line.split("").map(() => "."));

const loc2Str = ({ row, col }) => `${row}-${col}`;
const str2Loc = (str) => {
  const [row, col] = str.split("-").map(Number);
  return { row, col };
};

let nines = new Set();

function check(row, col, prevVal = -1) {
  const currVal = grid[row]?.[col];
  if (currVal === undefined) return;
  if (currVal - prevVal !== 1) return;
  if (currVal === 9) {
    nines.add(loc2Str({ row, col }));
    return;
  }

  showGrid[row][col] = currVal;

  check(row - 1, col, currVal);
  check(row + 1, col, currVal);
  check(row, col - 1, currVal);
  check(row, col + 1, currVal);
}

let part1 = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] !== 0) continue;
    nines = new Set();
    check(row, col);

    part1 += nines.size;
    //  show(showGrid.map((line) => line.join("")));
  }
}
show(part1);
