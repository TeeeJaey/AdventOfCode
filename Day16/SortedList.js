export class SortedList {
  constructor(sortKey) {
    this.list = [];
    this.sortKey = sortKey;
  }

  push(item) {
    let index = 0;
    while (index < this.list.length) {
      if (this.list[index][this.sortKey] <= item[this.sortKey]) break;
      index++;
    }
    this.list.splice(index, 0, item);
  }

  pop() {
    return this.list.pop();
  }

  hasItems() {
    return this.list.length > 0;
  }
}
