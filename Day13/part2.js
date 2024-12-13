import { getData } from "./data.js";

const show = console.log;

const qSet = getData(true);

let part2 = 0;
qSet.forEach(({ A, B, P }) => {
  /*
    A.x A + B.x B = P.x;
    A.y A + B.y B = P.y;

    D = |A.x  B.x|
        |A.y  B.y|

    Da= |P.x  B.x|
        |P.y  B.y|

    Db= |A.x  P.x|
        |A.y  P.y|
  */

  const D = A.x * B.y - B.x * A.y;
  const aSol = (P.x * B.y - B.x * P.y) / D;
  const bSol = (A.x * P.y - P.x * A.y) / D;
  if (aSol === Math.round(aSol) && bSol === Math.round(bSol)) {
    part2 += aSol * 3 + bSol;
  }
});

show(part2);
