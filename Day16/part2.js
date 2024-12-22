import { data } from "./data.js";
import { SortedList } from "./SortedList.js";

const input = data.split("\n");
const WALL = "#";
const END = "E";
const start = { row: input.length - 2, col: 1 };
const end = { row: 1, col: input.length - 2 };
let part1 = Infinity;

const sortList = new SortedList("points");
sortList.push({ points: 0, ...start, deltaRow: 0, deltaCol: 1 });

const neighbours = {};
neighbours[[input.length - 2, 1, 0, 1]] = { points: 0, previous: [] };

const pushNeighbour = (points, row, col, deltaRow, deltaCol, prevItem) => {
  const neighbourKey = [row, col, deltaRow, deltaCol];
  if (!neighbours[neighbourKey] || points < neighbours[neighbourKey].points) {
    neighbours[neighbourKey] = { points, previous: [prevItem] };
    sortList.push({
      points,
      row,
      col,
      deltaRow,
      deltaCol,
    });
  } else if (points > neighbours[neighbourKey].points) return;
  else if (points === neighbours[neighbourKey].points)
    neighbours[neighbourKey].previous.push(prevItem);
};

while (sortList.hasItems()) {
  const item = sortList.pop();
  const { points, row, col, deltaRow, deltaCol } = item;

  if (points > part1) break;
  if (input[row][col] === END) part1 = points;
  if (
    neighbours[[row, col, deltaRow, deltaCol]] &&
    points > neighbours[[row, col, deltaRow, deltaCol]].points
  )
    continue;

  if (input[row + deltaRow][col + deltaCol] !== WALL)
    pushNeighbour(
      points + 1,
      row + deltaRow,
      col + deltaCol,
      deltaRow,
      deltaCol,
      item
    );
  pushNeighbour(points + 1000, row, col, -deltaCol, deltaRow, item);
  pushNeighbour(points + 1000, row, col, deltaCol, -deltaRow, item);
}

const seats = {};
const visited = {};
const moveBack = (row, col, deltaRow, deltaCol) => {
  const visItem = [row, col, deltaRow, deltaCol];
  if (visited[visItem]) return;

  visited[visItem] = true;
  seats[[row, col]] = true;

  for (let item of neighbours[visItem].previous) {
    moveBack(item.row, item.col, item.deltaRow, item.deltaCol);
  }
};
moveBack(end.row, end.col, 0, -1);

const part2 = Object.keys(seats).length;

console.log("Part 1", part1); // 99488
console.log("Part 2", part2); // 516
