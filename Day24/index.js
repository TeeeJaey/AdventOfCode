import { data } from "./data.js";
const print = console.log;

const [valuesRaw, equationsRaw] = data.split("\n\n");
const values = {};
valuesRaw.split("\n").forEach((line) => {
  const [key, val] = line.split(": ");
  values[key] = Number(val);
});

const equations = {};
equationsRaw.split("\n").forEach((line) => {
  const [op, res] = line.split(" -> ");
  const [item1, operation, item2] = op.split(" ");
  equations[res] = { item1, operation, item2 };
});

const performOperation = (item1, item2, operation) => {
  switch (operation) {
    case "XOR":
      return item1 ^ item2;
    case "OR":
      return item1 | item2;
    case "AND":
      return item1 & item2;
  }
};

const findValue = (key) => {
  if (values[key] !== undefined) return values[key];

  const { item1, item2, operation } = equations[key];

  const item1Val = findValue(item1);
  const item2Val = findValue(item2);

  values[key] = performOperation(item1Val, item2Val, operation);
  return values[key];
};

let part1 = 0;
for (let z = 0; z < 46; z++) {
  const zKey = `z${z < 10 ? "0" + z : z}`;
  const zVal = findValue(zKey);

  part1 = Math.pow(2, z) * zVal + part1;
}
print(part1);
