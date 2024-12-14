const qstnSet = data
  .trim()
  .split("\n")
  .map((line) => {
    const [p, v] = line.split(" ");
    const [pKey, pVal] = p.split("=");
    const [vKey, vVal] = v.split("=");
    const [pL, pT] = pVal.split(",").map(Number);
    const [vL, vT] = vVal.split(",").map(Number);
    return { p: { top: pT, left: pL }, v: { top: vT, left: vL } };
  });

const width = 101;
const height = 103;

const moveRobots = (seconds = 100) => {
  const final = [...Array(height)].map(() => [...Array(width)].map(() => 0));

  qstnSet.forEach(({ p, v }) => {
    let lFinal = (v.left * seconds + p.left) % width;
    lFinal = lFinal < 0 ? width + lFinal : lFinal;
    let tFinal = (v.top * seconds + p.top) % height;
    tFinal = tFinal < 0 ? height + tFinal : tFinal;

    final[tFinal][lFinal] += 1;
  });

  return final;
};

const part1 = () => {
  const midW = (width - 1) / 2;
  const midH = (height - 1) / 2;
  const quadrants = [0, 0, 0, 0];
  finalGrid.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      if (rowIndex === midH || colIndex === midW) return;
      if (rowIndex < midH) {
        if (colIndex < midW) quadrants[0] += item;
        else quadrants[1] += item;
      } else {
        if (colIndex < midW) quadrants[2] += item;
        else quadrants[3] += item;
      }
    });
  });
  print(quadrants.reduce((acc, item) => acc * item, 1));
};

function start() {
  let i = 6800;
  let divMain = document.createElement("div");
  const interval = setInterval(() => {
    if (document.getElementById("grid-container").hasChildNodes())
      document.getElementById("grid-container").removeChild(divMain);

    divMain = document.createElement("div");
    document.getElementById("grid-container").appendChild(divMain);
    const divLabel = document.createElement("div");
    divLabel.innerText = `-------------Seconds : ${i}--------------`;
    divMain.appendChild(divLabel);

    const finalGrid = moveRobots(i);
    const divGrid = document.createElement("div");
    divGrid.classList.add("grid");
    divMain.appendChild(divGrid);

    finalGrid.forEach((line) => {
      const divLine = document.createElement("div");
      divLine.classList.add("grid-line");
      divGrid.appendChild(divLine);
      line.forEach((item) => {
        const divItem = document.createElement("div");
        divItem.classList.add("grid-line-item");
        if (item > 0) divItem.classList.add("white");
        divLine.appendChild(divItem);
      });
    });

    if (i === 6888) clearInterval(interval);
    i++;
  }, 100);
}
// part2 - 6888
