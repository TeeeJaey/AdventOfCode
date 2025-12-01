import { data } from "./data.js";

const grid = data
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const loc2Str = ({ row, col }) => `${row}-${col}`;
const str2Loc = (str) => {
  const [row, col] = str.split("-").map(Number);
  return { row, col };
};

const nodes = new Set();
grid.forEach((line) =>
  line.forEach((item) => {
    if (item !== ".") nodes.add(item);
  })
);

const getAntinodeLocationsPart1 = (a, b) => {
  const rowDiff = b.row - a.row;
  const colDiff = b.col - a.col;

  const xRow = a.row - rowDiff;
  const xCol = a.col - colDiff;

  const yRow = b.row + rowDiff;
  const yCol = b.col + colDiff;

  return [
    { row: xRow, col: xCol },
    { row: yRow, col: yCol },
  ];
};

const antinodeLocations = new Set();
const markAntinode = ({ row, col }) => {
  if (!grid[row]?.[col]) return;
  antinodeLocations.add(loc2Str({ row, col }));
};

export const part1 = () => {
  for (const node of nodes) {
    const positions = new Set();
    grid.forEach((line, row) =>
      line.forEach((item, col) => {
        if (item == node) positions.add(loc2Str({ row, col }));
      })
    );

    const posList = [...positions];
    posList.forEach((pos, index) => {
      const a = str2Loc(pos);

      for (let i = index + 1; i < posList.length; i++) {
        const b = str2Loc(posList[i]);
        const [x, y] = getAntinodeLocationsPart1(a, b);
        markAntinode(x);
        markAntinode(y);
      }
    });
  }
  return antinodeLocations.size;
};
