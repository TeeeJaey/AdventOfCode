import { getData } from "./getData.js";
const log = console.log;
const data = await getData();

const solve = (list, operator) => {
    if (list.length === 0) throw new Error("Empty list - ", operator);

    if (operator === "+") return list.reduce((a, b) => a + b, 0);
    if (operator === "*") return list.reduce((a, b) => a * b, 1);

    throw new Error("Unsupported operator - ", operator);
};

const getPart1 = () => {
    const input = data.split("\n").map((line) =>
        line
            .trim()
            .split(" ")
            .filter((x) => x.length)
    );

    let part1 = 0;
    for (let i = 0; i < input[0].length; i++) {
        const list = [input[0][i], input[1][i], input[2][i], input[3][i]].map(
            Number
        );
        const operator = input[4][i];
        const ans = solve(list, operator);
        part1 += ans;
    }

    return part1;
};

const getPart2 = () => {
    const input = data.split("\n").map((line) => line.split(""));
    //log(input);
    const OPERATOR_INDEX = 4;
    const rawoperatorList = input[OPERATOR_INDEX];
    log(rawoperatorList);

    let previousOperatorIndex = 0;
    let previousOperator = "";
    const operations = [];
    rawoperatorList.forEach((operator, index) => {
        if (operator === "+" || operator === "*") {
            if (index === 0) {
                previousOperatorIndex = index;
                previousOperator = operator;
                return;
            }
            const list = [
                input[0].slice(previousOperatorIndex, index - 1).join(""),
                input[1].slice(previousOperatorIndex, index - 1).join(""),
                input[2].slice(previousOperatorIndex, index - 1).join(""),
                input[3].slice(previousOperatorIndex, index - 1).join(""),
                previousOperator,
            ];
            operations.push(list);
            previousOperatorIndex = index;
            previousOperator = operator;
        }
    });
    // Push the last operation
    const lastList = [
        input[0].slice(previousOperatorIndex).join(""),
        input[1].slice(previousOperatorIndex).join(""),
        input[2].slice(previousOperatorIndex).join(""),
        input[3].slice(previousOperatorIndex).join(""),
        previousOperator,
    ];
    operations.push(lastList);

    log(operations);

    let part2 = 0;
    operations.forEach((operation) => {
        const list = [];
        for (let i = 0; i < operation[0].length; i++) {
            const num = parseInt(
                operation[0][i] +
                    operation[1][i] +
                    operation[2][i] +
                    operation[3][i]
            );
            list.push(num);
        }

        const operator = operation[OPERATOR_INDEX];
        const ans = solve(list, operator);
        part2 += ans;
    });

    return part2;
};

//log({ part1 });

const part1 = getPart1();
const part2 = getPart2();
log({ part1, part2 });
