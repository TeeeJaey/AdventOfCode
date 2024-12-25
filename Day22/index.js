import { data } from "./data.js";
const print = console.log;

const randomNumber = (seed) => {
  seed = ((seed << 6n) ^ seed) % 16777216n;
  seed = ((seed >> 5n) ^ seed) % 16777216n;
  seed = ((seed << 11n) ^ seed) % 16777216n;

  return seed;
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input) => {
  return input
    .split("\n")
    .map((num) => BigInt(num))
    .reduce((sum, num) => {
      let seed = num;
      for (let i = 0; i < 2000; i++) {
        seed = randomNumber(seed);
      }
      return sum + seed;
    }, 0n);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input) => {
  const ranges = {};
  input
    .split("\n")
    .map((num) => BigInt(num))
    .forEach((num) => {
      let seed = num;
      const visited = new Set();
      const changes = [];
      for (let i = 0; i < 2000; i++) {
        const nextSeed = randomNumber(seed);
        changes.push(Number((nextSeed % 10n) - (seed % 10n)));
        seed = nextSeed;

        if (changes.length === 4) {
          const key = changes.join(",");
          if (!visited.has(key)) {
            if (ranges[key] === undefined) ranges[key] = [];
            ranges[key].push(Number(nextSeed % 10n));
            visited.add(key);
          }
          changes.shift();
        }
      }
    });

  return Math.max(
    ...Object.values(ranges).map((range) =>
      range.reduce((sum, num) => sum + num, 0)
    )
  );
};
print(part1(data).toString()); // 19927218456
print(part2(data).toString()); // 2189
