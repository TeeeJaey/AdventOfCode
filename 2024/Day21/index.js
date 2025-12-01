import { data } from "./data.js";
const print = console.log;

const BFS_DIRECTIONS = {
  "^": { x: 0, y: -1 },
  ">": { x: 1, y: 0 },
  v: { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
};

const KEYPAD = {
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  X: { x: 0, y: 3 },
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 },
};

const DIRECTIONS = {
  X: { x: 0, y: 0 },
  "^": { x: 1, y: 0 },
  A: { x: 2, y: 0 },
  "<": { x: 0, y: 1 },
  v: { x: 1, y: 1 },
  ">": { x: 2, y: 1 },
};

const getBfsPaths = (input, start, end) => {
  const queue = [{ ...input[start], path: "" }];
  const distances = {};

  if (start === end) return ["A"];

  let allPaths = [];
  while (queue.length) {
    const current = queue.shift();
    if (current === undefined) break;

    if (current.x === input[end].x && current.y === input[end].y)
      allPaths.push(current.path + "A");
    if (
      distances[`${current.x},${current.y}`] !== undefined &&
      distances[`${current.x},${current.y}`] < current.path.length
    )
      continue;

    Object.entries(BFS_DIRECTIONS).forEach(([direction, vector]) => {
      const position = { x: current.x + vector.x, y: current.y + vector.y };

      if (input.X.x === position.x && input.X.y === position.y) return;

      const button = Object.values(input).find(
        (button) => button.x === position.x && button.y === position.y
      );
      if (button !== undefined) {
        const newPath = current.path + direction;
        if (
          distances[`${position.x},${position.y}`] === undefined ||
          distances[`${position.x},${position.y}`] >= newPath.length
        ) {
          queue.push({ ...position, path: newPath });
          distances[`${position.x},${position.y}`] = newPath.length;
        }
      }
    });
  }

  return allPaths.sort((a, b) => a.length - b.length);
};

const getKeyPresses = (input, code, robot, cache) => {
  const key = `${code},${robot}`;
  if (cache[key] !== undefined) return cache[key];

  let current = "A";
  let length = 0;
  for (let i = 0; i < code.length; i++) {
    const paths = getBfsPaths(input, current, code[i]);
    if (robot === 0) length += paths[0].length;
    else {
      length += Math.min(
        ...paths.map((path) =>
          getKeyPresses(DIRECTIONS, path, robot - 1, cache)
        )
      );
    }
    current = code[i];
  }

  cache[key] = length;
  return length;
};

const cache = {};
const part1 = (input) => {
  const keycodeList = input.trim().split("\n");

  return keycodeList.reduce((sum, code) => {
    const numerical = parseInt(code);
    return sum + numerical * getKeyPresses(KEYPAD, code, 2, cache);
  }, 0);
};

const part2 = (input) => {
  const keycodes = input.trim().split("\n");

  return keycodes.reduce((sum, code) => {
    const numerical = parseInt(code);
    return sum + numerical * getKeyPresses(KEYPAD, code, 25, cache);
  }, 0);
};

print(part1(data)); // 215374
print(part2(data)); // 260586897262600
