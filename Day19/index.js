import { data } from "./data.js";
const print = console.log;

const [towelsStr, designsStr] = data.split("\n\n");
const towels = towelsStr.split("\n").join("").split(", ");
const designs = designsStr.split("\n");

const returnFound = (substr, found) => {
  cache[substr] = found;
  return found;
};

const cache = {};
const dfs = (remainingString) => {
  if (remainingString.length === 0) return 1;

  if (cache[remainingString] !== undefined) return cache[remainingString];

  let foundCount = 0;
  for (let i = 0; i < towels.length; i++) {
    const towel = towels[i];
    if (remainingString.startsWith(towel))
      foundCount += dfs(remainingString.slice(towel.length));
  }

  return returnFound(remainingString, foundCount);
};

let part1 = 0;
let part2 = 0;
designs.forEach((design) => {
  const count = dfs(design);
  if (count > 0) {
    part1 += 1;
    part2 += count;
  }
});
print(part1);
print(part2);
