const LEFT = "L";
const RIGHT = "R";

let part2 = 0;
let curr = -30;

const { dir, value } = { dir: "L", value: 40 };

if (dir === RIGHT) {
    if (curr >= 0) {
        part2 += Math.floor((value - (100 - curr)) / 100) + 1;
    } else {
        part2 += Math.floor((value - (0 - curr)) / 100) + 1;
    }

    curr += value;
} else if (dir === LEFT) {
    if (curr <= 0) {
        part2 += Math.floor((value - -1 * (-100 - curr)) / 100) + 1;
    } else {
        part2 += Math.floor((value - -1 * (0 - curr)) / 100) + 1;
    }

    curr -= value;
}

console.log(part2);
