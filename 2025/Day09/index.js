import { data } from "./data.js";
const log = console.log;
const input = data.split("\n").map((line) => line.split(",").map(Number));

let maxArea = 0;
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        const [x1, y1] = input[i];
        const [x2, y2] = input[j];
        const area = Math.abs(x1 - x2 + 1) * Math.abs(y1 - y2 + 1);
        if (area > maxArea) {
            maxArea = area;
        }
    }
}

log({ part1: maxArea }); // 4739623064
