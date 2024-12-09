import { getData } from "./data.js";

const show = console.log;
const input = await getData();

let output = [];
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

let start = 0;
let end = output.length - 1;

while (true) {
  while (output[start] !== ".") {
    start++;
  }
  while (output[end] === ".") {
    end--;
  }
  if (start > end) break;
  // SWAP
  const temp = output[end];
  output[end] = output[start];
  output[start] = temp;
}

let part1 = 0;
for (let i = 1; i < output.length; i++) {
  const val = Number(output[i]) * i;
  if (isNaN(val)) break;
  part1 += val;
}

show(part1);
