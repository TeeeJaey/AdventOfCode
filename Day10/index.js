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

let nines = new Set();
function check(row, col, prevVal = -1) {
  const currVal = grid[row]?.[col];
  if (currVal === undefined) return 0;
  if (currVal - prevVal !== 1) return 0;
  if (currVal === 9) {
    nines.add(loc2Str({ row, col }));
    return 1;
  }

  showGrid[row][col] = currVal;

  let rating = 0;
  rating += check(row - 1, col, currVal);
  rating += check(row + 1, col, currVal);
  rating += check(row, col - 1, currVal);
  rating += check(row, col + 1, currVal);
  return rating;
}

let part1 = 0;
let part2 = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] !== 0) continue;

    nines = new Set();
    const rating = check(row, col);

    part1 += nines.size;
    part2 += rating;
  }
}
show("Part1:", part1); // 593
show("Part2:", part2); // 1192
