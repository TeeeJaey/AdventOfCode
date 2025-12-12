import { data } from "./data.js";

const input = data.split("\n\n").filter((x) => x.length > 0);
const regions = input
    .pop()
    .split("\n")
    .filter((x) => x.length > 0)
    .map((x) => {
        const [size, counts] = x.split(": ");
        const [width, height] = size.split("x").map((x) => parseInt(x));
        return {
            counts: counts.split(" ").map((x) => parseInt(x)),
            width,
            height,
        };
    });
const presents = input.map((x) => x.split("\n").slice(1).join(""));

let result = 0;
for (const { counts, width, height } of regions) {
    let size = 0;
    for (let i = 0; i < presents.length; i++) {
        size += (presents[i].split("#").length - 1) * counts[i];
    }
    if (width * height >= size) result++;
}

console.log(result);
