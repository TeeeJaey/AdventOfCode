import { data } from "./data.js";
const log = console.log;

const [s, i] = data.split("\n\n");

const sets = s
    .split("\n")
    .map((item) => {
        const [start, end] = item.split("-").map(Number);
        return { start, end };
    })
    .sort((a, b) => (a.start === b.start ? a.end - b.end : a.start - b.start));

const input = i
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

const getPart1 = () => {
    let setIndex = 0;
    let inputIndex = 0;
    let part1 = 0;

    while (true) {
        const currSet = sets[setIndex];
        const currInput = input[inputIndex];
        if (setIndex >= sets.length) {
            break;
        }

        if (inputIndex >= input.length) {
            break;
        }
        if (currInput < currSet.start) {
            inputIndex++;
            continue;
        }

        if (currInput >= currSet.start && currInput <= currSet.end) {
            part1++;
            inputIndex++;
        } else {
            setIndex++;
        }
    }
    return part1;
};

const getPart2 = () => {
    let part2 = 0;
    let index = 0;
    while (index < sets.length) {
        let { start, end } = sets[index];

        if (index === 0) {
            part2 = part2 + (end - start + 1);
        } else {
            const prevEnd = sets[index - 1].end;

            if (start > prevEnd) {
                part2 = part2 + (end - start + 1);
            } else if (end > prevEnd) {
                part2 = part2 + (end - prevEnd);
            }
        }
        index++;
    }
    return part2;
};

const part1 = getPart1(); // 896
const part2 = getPart2(); // 346240317247002

log({ part1, part2 });
