import { getData } from "./data.js";

const show = console.log;
const input = await getData();

const output = [];
let id = 0;
let isFreeSpace = false;
input.split("").forEach((item) => {
  const val = Number(item);
  for (let i = 0; i < val; i++) {
    output.push(isFreeSpace ? "." : id.toString());
  }
  if (isFreeSpace) id += 1;
  isFreeSpace = !isFreeSpace;
});

const part1 = () => {
  const list = [...output];
  let start = 0;
  let end = list.length - 1;
  while (true) {
    while (list[start] !== ".") {
      start++;
    }
    while (list[end] === ".") {
      end--;
    }
    if (start > end) break;

    // SWAP
    const temp = list[end];
    list[end] = list[start];
    list[start] = temp;
  }

  let part1 = 0;
  for (let i = 1; i < list.length; i++) {
    const val = Number(list[i]) * i;
    if (isNaN(val)) break;
    part1 += val;
  }

  show(part1);
};

const part2 = () => {
  let list = [...output];

  let itemAcc = [];
  const newList = [];
  list.forEach((item) => {
    if (itemAcc.length === 0 || itemAcc.includes(item)) {
      itemAcc.push(item);
      return;
    }
    newList.push(itemAcc);
    itemAcc = [item];
  });
  if (itemAcc.length > 0) newList.push(itemAcc);

  for (let end = newList.length - 1; end > -1; end--) {
    if (newList[end][0] === ".") continue;

    let swapMade = false;
    for (let start = 0; start < end; start++) {
      if (newList[start][0] !== ".") continue;
      if (newList[start].length < newList[end].length) continue;

      // SWAP
      const dots = [];
      newList[start] = newList[start]
        .map((_, index) => {
          if (newList[end][index]) return newList[end][index];
          else {
            dots.push(".");
            return "";
          }
        })
        .filter((_) => _ !== "");

      newList[end] = newList[end].map((_) => ".");
      newList.splice(start + 1, 0, dots);

      swapMade = true;
      break;
    }

    if (swapMade) end++;
  }

  let part2 = 0;
  let itemIndex = 0;
  for (let i = 0; i < newList.length; i++) {
    for (let j = 0; j < newList[i].length; j++) {
      if (newList[i][j] !== ".") {
        const val = Number(newList[i][j]) * itemIndex;
        part2 += val;
      }
      itemIndex++;
    }
  }

  show(part2);
};

part1(); // 6395800119709
part2(); // ?
