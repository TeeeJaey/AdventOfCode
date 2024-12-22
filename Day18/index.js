import { data } from "./data.js";

const input = data.trim().split("\n");
const grid = Array.from({ length: 71 }, () => Array(71).fill("."));
const DELTA = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];
let bytes = 1024;
const CORRUPT = "#";

for (let i = 0; i < bytes; i++) {
  const [col, row] = input[i].split(",").map(Number);
  grid[row][col] = CORRUPT;
}

const loc2Str = ({ row, col }) => `${row}-${col}`;

function bfs() {
  const start = { row: 0, col: 0, cost: 0 };
  const traversed = new Set();
  traversed.add(loc2Str(start));
  const neighbourList = [start];

  while (neighbourList.length > 0) {
    const curr = neighbourList.shift();
    if (curr.row === 70 && curr.col === 70) {
      return curr.cost;
    }

    for (let [dRow, dCol] of DELTA) {
      const neighbour = { row: curr.row + dRow, col: curr.col + dCol };
      const neighbourKey = loc2Str(neighbour);
      const neighbourVal = grid[neighbour.row]?.[neighbour.col];

      if (neighbourVal === undefined) continue;
      if (neighbourVal === CORRUPT) continue;

      if (!traversed.has(neighbourKey)) {
        neighbourList.push({ ...neighbour, cost: curr.cost + 1 });
        traversed.add(neighbourKey);
      }
    }
  }
  return -1;
}
console.log("Part 1", bfs()); // 270

while (bfs() > 0) {
  bytes++;
  const [col, row] = input[bytes].split(",").map(Number);
  grid[row][col] = CORRUPT;
}

console.log("Part 2", input[bytes]); // 51,40
