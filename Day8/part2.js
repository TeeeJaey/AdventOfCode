import { data } from "./data.js";
const show = console.log;

const input = data;

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const antinodeGrid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const nodes = new Set();
grid.forEach((line) =>
  line.forEach((item) => {
    if (item !== ".") nodes.add(item);
  })
);

const getAntinodeLocationsPart2 = (a, b) => {
  const rowDiff = b.row - a.row;
  const colDiff = b.col - a.col;

  const antinodes = [];
  let xRow = a.row - rowDiff;
  let xCol = a.col - colDiff;
  antinodes.push({ row: xRow, col: xCol });

  while (true) {
    xRow = xRow - rowDiff;
    xCol = xCol - colDiff;
    if (!grid[xRow]?.[xCol]) break;
    antinodes.push({ row: xRow, col: xCol });
  }

  let yRow = b.row + rowDiff;
  let yCol = b.col + colDiff;
  antinodes.push({ row: yRow, col: yCol });

  while (true) {
    yRow = yRow + rowDiff;
    yCol = yCol + colDiff;
    if (!grid[yRow]?.[yCol]) break;
    antinodes.push({ row: yRow, col: yCol });
  }

  return antinodes;
};

const loc2Str = ({ row, col }) => `${row}-${col}`;
const str2Loc = (str) => {
  const [row, col] = str.split("-").map(Number);
  return { row, col };
};

const antinodeLocations = new Set();
const antinodeLocationsPart2 = new Set();
const markAntinode = ({ row, col }) => {
  if (!grid[row]?.[col]) return;
  antinodeLocations.add(loc2Str({ row, col }));
  antinodeLocationsPart2.add(loc2Str({ row, col }));

  if (antinodeGrid[row][col] !== ".") antinodeGrid[row][col] = "#";
};

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
    antinodeLocationsPart2.add(pos);

    for (let i = index + 1; i < posList.length; i++) {
      const b = str2Loc(posList[i]);
      const antinodes = getAntinodeLocationsPart2(a, b);
      antinodes.forEach((antinode) => markAntinode(antinode));
    }
  });
}

// antinodeGrid.forEach((line) => show(line.join("")));

show(antinodeLocationsPart2.size); // 1067
