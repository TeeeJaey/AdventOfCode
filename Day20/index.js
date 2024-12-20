import { data } from "./data.js";

const grid = data
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const print = console.log;
const loc2Str = ({ row, col }) => `${row}-${col}`;
const str2Loc = (str) => {
  const [row, col] = str.split("-").map(Number);
  return { row, col };
};

const START = "S";
const END = "E";
const EMPTY = ".";
const WALL = "#";
const DELTA = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const getStart = () => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === START) return { row, col };
    }
  }
};
const start = getStart();

const track = new Set();
track.add(loc2Str(start));

let curr = { ...start };
while (grid[curr.row]?.[curr.col] !== END) {
  const [deltaRow, deltaCol] = DELTA.find(
    ([dRow, dCol]) =>
      grid[curr.row + dRow]?.[curr.col + dCol] !== WALL &&
      !track.has(loc2Str({ row: curr.row + dRow, col: curr.col + dCol }))
  );
  const next = { row: curr.row + deltaRow, col: curr.col + deltaCol };
  track.add(loc2Str(next));
  curr = { ...next };
}

const trackList = [...track];

let part1 = 0;
let i = 0;
while (i < trackList.length) {
  const curr = str2Loc(trackList[i]);

  DELTA.forEach(([dRow, dCol]) => {
    const skip = {
      row: curr.row + dRow + dRow,
      col: curr.col + dCol + dCol,
    };

    const skipValue = grid[skip.row]?.[skip.col];
    if (!skipValue) return;
    if (skipValue === WALL) return;

    let j = i + 1;
    while (j < trackList.length) {
      if (loc2Str(skip) === trackList[j] && j - i - 2 >= 100) {
        part1++;
        break;
      }
      j++;
    }
  });
  i++;
}

print(part1);
