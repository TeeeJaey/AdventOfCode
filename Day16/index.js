import { data } from "./data.js";

const print = console.log;
const grid = data.split("\n").map((line) => line.split(""));
const WALL = "#";
const MOVEMENT = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const start = { row: grid.length - 2, col: 1 };
const end = { row: 1, col: grid[1].length - 2 };

const loc2Str = ({ row, col }) => `${row}-${col}`;

const pointsDict = { [loc2Str(start)]: 0 };
const neighbourQueue = [];
neighbourQueue.push({
  ...start,
  points: 0,
  direction: 1,
});
const exploredSet = new Set();

while (neighbourQueue.length > 0) {
  neighbourQueue.sort((a, b) => b.points - a.points);
  const curr = neighbourQueue.pop();
  exploredSet.add(loc2Str(curr));
  const points = pointsDict[loc2Str(curr)];
  const direction = curr.direction;
  const directionList = [direction, (direction + 1) % 4, (direction + 3) % 4];

  directionList.forEach((dir, dirIndex) => {
    const delta = MOVEMENT[dir];
    let newPoints = points + 1;
    if (dirIndex !== 0) newPoints += 1000; // TURN

    const neighbour = { row: curr.row + delta[0], col: curr.col + delta[1] };
    const neighbourKey = loc2Str(neighbour);
    if (!grid[neighbour.row]?.[neighbour.col]) return;
    if (exploredSet.has(neighbourKey)) return;
    if (grid[neighbour.row][neighbour.col] === WALL) return;
    if (!pointsDict[neighbourKey]) pointsDict[neighbourKey] = Infinity;
    if (newPoints < pointsDict[neighbourKey])
      pointsDict[neighbourKey] = newPoints;

    neighbourQueue.push({
      ...neighbour,
      points: pointsDict[neighbourKey],
      direction: dir,
    });
  });
}

const part1 = pointsDict[loc2Str(end)];
print(part1); //99488

/*
const dfs = (row, col, direction, points = 0, traversedSet = new Set()) => {
  if (traversedSet.has([row, col].toString())) return Infinity;
  traversedSet.add([row, col].toString());

  if (row === end.row && col === end.col) {
    return points;
  }
  const directionList = [direction, (direction + 1) % 4, (direction + 3) % 4];

  let returnPoints = Infinity;
  directionList.forEach((dir, dirIndex) => {
    const delta = MOVEMENT[dir];
    const next = { row: row + delta[0], col: col + delta[1] };
    const nextItem = grid[next.row]?.[next.col];

    let newPoints = points + 1;
    if (dirIndex !== 0) newPoints += 1000; // TURN

    if (nextItem && nextItem !== WALL) {
      const nextPoints = dfs(
        next.row,
        next.col,
        dir,
        newPoints,
        new Set(traversedSet)
      );
      if (nextPoints < returnPoints) returnPoints = nextPoints;
    }
  });

  return returnPoints;
};

const points = dfs(start.row, start.col, 1);

print(points);
*/
