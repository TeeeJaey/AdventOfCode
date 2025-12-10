import { data } from "./data.js";
const log = console.log;

const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`
    .split("\n")
    .map((line) => {
        const machine = line.split(" ");

        const target = machine[0].split("").slice(1, -1);
        const buttons = machine.slice(1, -1).map((segment) => {
            return segment.slice(1, -1).split(",").map(Number);
        });
        const joltage = machine[machine.length - 1].slice(1, -1).split(",");

        return {
            target,
            buttons,
            joltage,
        };
    });

for (const machine of input) {
    const { target, buttons, joltage } = machine;
    log({ target, buttons, joltage });
}
