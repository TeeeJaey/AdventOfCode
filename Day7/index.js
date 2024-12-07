import { data } from "./data.js";

const show = console.log;

const input = data
  .trim()
  .split("\n")
  .map((line) => {
    const [ans, itemStr] = line.split(":").map((x) => x.trim());
    const items = itemStr.split(" ").map(Number);
    return { ans: Number(ans), items };
  });

let opsDict = {};
function getOpsList(items, isPart2) {
  const opsListLength = items.length - 1;
  if (opsDict[opsListLength]) return opsDict[opsListLength];

  const opsList = [];
  function recurs(ops, index) {
    if (index === opsListLength) {
      opsList.push([...ops]);
      return;
    }

    recurs([...ops, "+"], index + 1);
    recurs([...ops, "*"], index + 1);
    if (isPart2) recurs([...ops, "|"], index + 1);
  }

  recurs([], 0);
  opsDict[opsListLength] = opsList;
  return opsList;
}

const performOps = (items, ops) => {
  return items.reduce((ans, item, index) => {
    if (index === 0) return item;
    const op = ops[index - 1];
    return op === "+"
      ? ans + item
      : op === "*"
      ? ans * item
      : Number(`${ans}${item}`);
  }, 0);
};

const part1 = () => {
  opsDict = {};
  let output = 0;
  input.forEach(({ ans, items }) => {
    const opsList = getOpsList(items);
    for (let i = 0; i < opsList.length; i++) {
      const ops = opsList[i];
      if (ans === performOps(items, ops)) {
        output += ans;
        break;
      }
    }
  });
  return output;
};

const part2 = () => {
  opsDict = {};
  let output = 0;
  input.forEach(({ ans, items }) => {
    const opsList = getOpsList(items, true);
    for (let i = 0; i < opsList.length; i++) {
      const ops = opsList[i];
      if (ans === performOps(items, ops)) {
        output += ans;
        break;
      }
    }
  });
  return output;
};

show(part1()); // 3119088655389
show(part2()); // 264184041398847
