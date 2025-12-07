import { data } from "./data.js";
const log = console.log;
const SPLIT = "^";
const START = "S";

const input = data.split("\n").map((line) => line.trim().split(""));

let part1 = 0;
let prev = input[0].map((s) => (s == START ? 1 : 0));

input.forEach((line) => {
    let curr = new Array(prev.length).fill(0);
    for (let i = 0; i < prev.length; i++) {
        if (line[i] == SPLIT && prev[i] > 0) {
            part1++;
            curr[i - 1] += prev[i];
            curr[i + 1] += prev[i];
        } else {
            curr[i] += prev[i];
        }
    }
    prev = curr;
});

const part2 = prev.reduce((a, b) => a + b, 0);

log({ part1, part2 }); // 1541 , 80158285728929
