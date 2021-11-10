export class PriorityQueue<T> extends Array<{ item: T; priority: number }> {
  sort() {
    return super.sort((a, b) => a.priority - b.priority);
  }

  enqueue(item: T, priority: number) {
    this.push({ item, priority });
    this.sort();

    return this;
  }

  dequeue() {
    return this.shift();
  }

  changePriority(item: T, priority) {
    // Remove item
    for (var i = 0; i < this.length; i++) {
      if (this[i].item === item) {
        this[i].priority = priority;
        break;
      }
    }

    // Resort
    this.sort();

    return this;
  }

  hasItem(item) {
    return !!this.filter((n) => n.item === item).length;
  }
}
