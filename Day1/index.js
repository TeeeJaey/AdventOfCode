import { data } from "./data.js";

const sorter = (a, b) => a - b;
const differ = (a, b) => (a > b ? a - b : b - a);
const print = console.log;

const listLeft = [];
const listRight = [];
data.split("\n").forEach((line) => {
  const [left, right] = line.split("   ").map(Number);
  listLeft.push(left);
  listRight.push(right);
});

listLeft.sort(sorter);
listRight.sort(sorter);

const dict = {};
let part1 = 0;
let part2 = 0;
listLeft.forEach((left, index) => {
  const right = listRight[index];
  const diff = differ(left, right);
  part1 += diff;

  let cnt = 0;
  if (!dict[left]) {
    let i = 0;
    while (i < listRight.length) {
      const r = listRight[i];
      if (r > left) break;
      if (r === left) cnt++;
      i++;
    }
    dict[left] = cnt;
  }

  part2 = part2 + left * dict[left];
});

print(part1); // 2066446
print(part2); // 24931009
