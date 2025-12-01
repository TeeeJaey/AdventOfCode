import { data } from "./data.js";
const print = console.log;

const input = data.split("\n");

const items = new Set();
const dict = {};

input.forEach((link) => {
  const [first, last] = link.split("-");
  if (dict[first] === undefined) dict[first] = new Set();
  dict[first].add(last);
  if (dict[last] === undefined) dict[last] = new Set();
  dict[last].add(first);

  items.add(first);
  items.add(last);
});

[...items].forEach((item) => {
  [...dict[item]].forEach((dItem) => {
    dItem;
  });
});

const isConnected = (a, b) => dict[a].has(b);

const lanSet = new Set();
const itemList = [...items];
itemList.forEach((item1, i) => {
  let j = i + 1;
  while (j < itemList.length) {
    const item2 = itemList[j];
    if (isConnected(item1, item2)) {
      [...dict[item2]].forEach((item3) => {
        if (isConnected(item3, item1)) {
          lanSet.add([item1, item2, item3].sort().join("-"));
        }
      });
    }
    j++;
  }
});

let part1 = 0;
[...lanSet].forEach((lan) => {
  let found = false;
  lan.split("-").forEach((lanItem) => {
    if (lanItem.startsWith("t")) found = true;
  });
  if (found) part1++;
});

print(part1); // 1358

const newLanSet = new Set();
[...lanSet].forEach((lan) => {
  const lanSetList = lan.split("-");

  [...itemList].forEach((item) => {
    if (!lanSetList.includes(item)) {
      let fail = false;
      lanSetList.forEach((lanSetItem) => {
        if (!dict[item].has(lanSetItem)) fail = true;
      });

      if (!fail) {
        lanSetList.push(item);
      }
    }
  });

  newLanSet.add(lanSetList.sort().join(","));
});

let curMax = "";
[...newLanSet].forEach((lan) => {
  if (lan.length > curMax.length) curMax = lan;
});

print(curMax); // cl,ei,fd,hc,ib,kq,kv,ky,rv,vf,wk,yx,zf
