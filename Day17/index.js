import { data } from "./data.js";

let [regs, program] = data.trim().split("\n\n");
const registers = {};
const programStr = program.split(" ")[1];
program = programStr.split(",").map(Number);
regs.split("\n").forEach((reg) => {
  registers[reg.slice(9, 10)] = Number(reg.slice(12));
});

function getOperandCombo(operand) {
  if (operand <= 3) return operand;
  else if (operand === 4) return registers.A;
  else if (operand === 5) return registers.B;
  else if (operand === 6) return registers.C;
  else if (operand === 7) return registers.A;
}

let pointer = 0;
let output = [];

function exec(opcode, operand) {
  const operandCombo = getOperandCombo(operand);

  switch (opcode) {
    case 0:
      registers.A = Math.floor(registers.A / 2 ** operandCombo);
      break;

    case 1:
      registers.B ^= operand;
      break;

    case 2:
      registers.B = operandCombo % 8;
      break;

    case 3:
      if (registers.A !== 0) {
        pointer = operandCombo;
        return true;
      }
      break;

    case 4:
      registers.B ^= registers.C;
      break;

    case 5:
      output.push(operandCombo % 8);
      break;

    case 6:
      registers.B = Math.floor(registers.A / 2 ** operandCombo);
      break;

    case 7:
      registers.C = Math.floor(registers.A / 2 ** operandCombo);
      break;
  }
}

const run = () => {
  while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];
    if (!exec(opcode, operand)) pointer += 2;
  }

  return output.toString();
};

console.log("Part 1:", run()); // 6,7,5,2,1,3,5,1,7

const part2 = (x) => {};
