import { data } from "./data.js";
const log = console.log;
const input = data.split("\n").map((line) => line.split(",").map(Number));

const distances = [];
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        const [x1, y1, z1] = input[i];
        const [x2, y2, z2] = input[j];
        const distance = Math.sqrt(
            (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2
        );
        distances.push({ i, j, distance });
    }
}

log(distances.sort((a, b) => a.distance - b.distance));
