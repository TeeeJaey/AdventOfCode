import { getGrid, getMoves } from "./data.js";
const print = console.log;
const printGrid = (grid) => print(grid.map((l) => l.join("")));

const orgGrid = getGrid()
  .split("\n")
  .map((line) => line.split(""));

const moves = getMoves().split("\n").join("").split("");

const DIRECTION = { UP: "^", RIGHT: ">", DOWN: "v", LEFT: "<" };
const BOXORG = "O";
const BOX = { LEFT: "[", RIGHT: "]" };
const ROBOT = "@";
const EMPTY = ".";
const WALL = "#";
const MOVEMENT = {
  [DIRECTION.UP]: [-1, 0],
  [DIRECTION.RIGHT]: [0, 1],
  [DIRECTION.DOWN]: [1, 0],
  [DIRECTION.LEFT]: [0, -1],
};

const grid = [...new Array(orgGrid.length)].map(() => []);
orgGrid.forEach((line, index) => {
  line.forEach((item) => {
    if (item === ROBOT) {
      grid[index].push(ROBOT);
      grid[index].push(EMPTY);
    } else if (item === BOXORG) {
      grid[index].push(BOX.LEFT);
      grid[index].push(BOX.RIGHT);
    } else {
      grid[index].push(item);
      grid[index].push(item);
    }
  });
});

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

  const moveBoxHorizontal = (row, col) => {
    if (grid[row][col] === EMPTY) return true;

    if (grid[row][col] === BOX.LEFT || grid[row][col] === BOX.RIGHT) {
      const boxMoved = moveBoxHorizontal(row, col + delta[1]);
      if (boxMoved) {
        grid[row][col + delta[1]] = grid[row][col];
        grid[row][col] = EMPTY;
        return true;
      }
    }
    return false;
  };

  const verticalMoveSet = new Set();
  const canMoveBoxVertically = (row, col) => {
    const boxSide = grid[row][col];
    const partnerDelta = boxSide === BOX.LEFT ? 1 : -1;
    const partnerCol = col + partnerDelta;

    verticalMoveSet.add([row, col].toString());
    verticalMoveSet.add([row, partnerCol].toString());

    const nextRow = row + delta[0];
    if (grid[nextRow][col] === WALL || grid[nextRow][partnerCol] === WALL) {
      return false;
    }
    if (
      (grid[nextRow][col] === EMPTY || canMoveBoxVertically(nextRow, col)) &&
      (grid[nextRow][partnerCol] === EMPTY ||
        canMoveBoxVertically(nextRow, partnerCol))
    ) {
      return true;
    }
  };

  if (
    grid[next.row][next.col] === BOX.LEFT ||
    grid[next.row][next.col] === BOX.RIGHT
  ) {
    if (move === DIRECTION.LEFT || move === DIRECTION.RIGHT) {
      moveBoxHorizontal(next.row, next.col);
    } else {
      if (canMoveBoxVertically(next.row, next.col)) {
        const boxesToMove = [...verticalMoveSet].map((pos) => {
          const [row, col] = pos.split(",").map(Number);
          return { row, col };
        });
        boxesToMove.sort(
          (a, b) => Math.abs(b.row - curr.row) - Math.abs(a.row - curr.row)
        );
        boxesToMove.forEach(({ row: r, col: c }) => {
          grid[r + delta[0]][c] = grid[r][c];
          grid[r][c] = EMPTY;
        });
      }
    }
  }

  if (grid[next.row][next.col] === EMPTY) {
    grid[next.row][next.col] = ROBOT;
    grid[curr.row][curr.col] = EMPTY;
    curr = { ...next };
    return;
  }
});

let part2 = 0;
grid.forEach((row, rowIndex) => {
  row.forEach((item, colIndex) => {
    if (item === BOX.LEFT) {
      part2 += 100 * rowIndex + colIndex;
    }
  });
});

print(part2); // 1554058
