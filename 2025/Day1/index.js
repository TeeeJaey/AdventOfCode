import { data } from "./data.js";

const LEFT = "L";
const RIGHT = "R";

const input = data.split("\n").map((s) => ({
    dir: s.slice(0, 1),
    value: Number(s.slice(1)),
}));

let part1 = 0;
let part2 = 0;

let curr = 50;

for (const { dir, value } of input) {
    if (dir === RIGHT) {
        if (curr >= 0) {
            part2 += Math.floor((value - (100 - curr)) / 100) + 1;
        } else {
            part2 += Math.floor((value - (0 - curr)) / 100) + 1;
        }
        curr += value;
    } else if (dir === LEFT) {
        if (curr <= 0) {
            part2 += Math.floor((value + (-100 - curr)) / 100) + 1;
        } else {
            part2 += Math.floor((value + (0 - curr)) / 100) + 1;
        }
        curr -= value;
    }

    curr = curr % 100;
    if (curr < 0) {
        curr += 100;
    } else if (curr >= 100) {
        curr -= 100;
    }

    if (curr === 0) {
        part1 += 1;
    }
}

console.log({ part1, part2 }); // 1031 , 5831
