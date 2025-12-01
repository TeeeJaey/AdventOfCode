import { getData } from "./data.js";

const show = console.log;

const qSet = getData();
const toSetKey = (aCount, bCount) => `${aCount}:${bCount}`;

let part1 = 0;
qSet.forEach(({ A, B, P }) => {
  const traversedTree = {};
  // { A: { x: 94, y: 34 }, B: { x: 22, y: 67 }, P: { x: 8400, y: 5400 } }
  const recurs = (xSum = 0, ySum = 0, aCount = 0, bCount = 0) => {
    const setKey = toSetKey(aCount, bCount);
    if (traversedTree[setKey]) {
      return traversedTree[setKey];
    }

    let ret = {};
    if (xSum >= P.x || ySum >= P.y) {
      ret = { xSum, ySum, aCount, bCount };
      traversedTree[setKey] = ret;
      return ret;
    }

    const addA = recurs(xSum + A.x, ySum + A.y, aCount + 1, bCount);
    const addB = recurs(xSum + B.x, ySum + B.y, aCount, bCount + 1);
    if (setKey === "0:0") debugger;
    if (
      addA.xSum === P.x &&
      addA.ySum === P.y &&
      addB.xSum === P.x &&
      addB.ySum === P.y
    ) {
      if (addA.aCount + addA.bCount < addB.aCount + addB.bCount) ret = addA;
      else ret = addB;
    } else if (addA.xSum === P.x && addA.ySum === P.y) ret = addA;
    else if (addB.xSum === P.x && addB.ySum === P.y) ret = addB;
    else {
      if (addA.aCount + addA.bCount < addB.aCount + addB.bCount) ret = addA;
      else ret = addB;
    }

    traversedTree[setKey] = ret;
    return ret;
  };

  const { xSum, ySum, aCount, bCount } = recurs();

  if (xSum === P.x && ySum === P.y) {
    part1 = aCount * 3 + bCount * 1 + part1;
  }
});
show(part1);
